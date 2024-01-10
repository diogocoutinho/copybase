import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber, SubscriberDocument } from '../schemas/subscribers.schema';
import * as XLSX from 'xlsx';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import * as moment from 'moment';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscribersModel: Model<SubscriberDocument>,
  ) {}

  async processUpload(file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new Error('File not found');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      range: 1,
      defval: '',
      blankrows: true,
      dateNF: 22,
    });

    const headerMapping = [
      'frequency',
      'billing_quantity',
      'billing_cycle',
      'start_date',
      'status',
      'status_date',
      'cancellation_date',
      'value',
      'next_cycle_date',
      'subscriber_id',
    ];

    const [...rows] = data;
    for (const row of rows) {
      let newRow = {};
      Object.keys(row).map((key, index) => {
        const newKey = headerMapping[index];
        if (row[key] === '__EMPTY') {
          row[key] = '';
        }
        if (
          newKey === 'next_cycle_date' ||
          newKey === 'start_date' ||
          newKey === 'status_date' ||
          newKey === 'cancelation_date'
        ) {
          let value = row[key];
          if (typeof value === 'string') {
            const [day, month, year] = value.split('/');
            value = `${month}/${day}/${year}`;
            value = moment(value, 'MM/DD/YYYY').toDate();
          } else if (typeof value === 'number') {
            value = this.serialDateToJSDate(value);
          }
          newRow = { ...newRow, [newKey]: value };
        } else {
          newRow = { ...newRow, [newKey]: row[key] };
        }
      });
      const createSubscriberDto: CreateSubscriberDto =
        newRow as CreateSubscriberDto;
      const subscriber = new this.subscribersModel(createSubscriberDto);
      try {
        await subscriber.save();
      } catch (error) {
        console.error('Error on line:', row);
        console.error(error);
        throw error;
      }
    }

    return { message: 'File processed successfully' };
  }

  async findAll() {
    const subscribers = await this.subscribersModel.find().exec();

    const subscribersByMonth = subscribers.reduce((groups, subscriber) => {
      const month = moment(subscriber.start_date).format('MM-YYYY');
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(subscriber);
      return groups;
    }, {});

    const mrrByMonth = {};
    const churnRateByMonth = {};
    for (const month in subscribersByMonth) {
      const subscribers = subscribersByMonth[month];

      const mrr = subscribers
        .filter(
          (subscriber: { status: string }) => subscriber.status === 'Ativa',
        )
        .reduce(
          (total: any, subscriber: { value: any }) => total + subscriber.value,
          0,
        );

      const churnRate =
        subscribers.filter(
          (subscriber: { status: string }) => subscriber.status === 'Cancelada',
        ).length / subscribers.length;

      mrrByMonth[month] = mrr;
      churnRateByMonth[month] = churnRate;
    }

    return { mrrByMonth, churnRateByMonth, subscribers };
  }

  serialDateToJSDate(serialDate: number) {
    const epoch = Date.UTC(1899, 11, 31);
    return new Date(epoch + serialDate * 24 * 60 * 60 * 1000);
  }
}
