import { Test, TestingModule } from '@nestjs/testing';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';
import { Readable } from 'stream';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

describe('SubscribersController', () => {
  let controller: SubscribersController;
  let service: {
    processUpload: jest.Mock<any, any, any>;
    findAll: jest.Mock<any, any, any>;
  };

  beforeEach(async () => {
    service = {
      processUpload: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribersController],
      providers: [
        {
          provide: SubscribersService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<SubscribersController>(SubscribersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload a file', async () => {
    const mockFile: Express.Multer.File = {
      buffer: Buffer.from('test'),
      originalname: 'test',
      encoding: '7bit',
      mimetype: 'text/csv',
      size: 100,
      fieldname: 'file',
      path: 'backend/modelo-teste-full-stack.xlsx',
      stream: Readable.from('test'),
      destination: './uploads',
      filename: 'modelo-teste-full-stack.xlsx',
    };
    service.processUpload.mockResolvedValue('success');
    expect(await controller.uploadFile(mockFile)).toBe('success');
  });

  it('should find all subscribers', async () => {
    const subscriberDto: CreateSubscriberDto = {
      frequency: 'monthly',
      billing_quantity: '1',
      billing_cycle: '1m',
      start_date: new Date('01/01/2021'),
      status: 'active',
      status_date: new Date('01/01/2021'),
      cancellation_date: '',
      value: '10',
      next_cycle_date: new Date('01/01/2021'),
      subscriber_id: '123',
    };
    service.processUpload.mockResolvedValue([subscriberDto]);
    expect(await controller.findAll());
  });
});
