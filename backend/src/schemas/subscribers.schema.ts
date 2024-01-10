import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriberDocument = Subscriber & Document;

@Schema({ timestamps: true })
export class Subscriber {
  @Prop()
  frequency: string;

  @Prop()
  billing_quantity: string;

  @Prop()
  billing_cycle: string;

  @Prop()
  start_date: Date;

  @Prop()
  status: string;

  @Prop()
  status_date: Date;

  @Prop()
  cancellation_date: Date;

  @Prop()
  value: string;

  @Prop()
  next_cycle_date: Date;

  @Prop()
  subscriber_id: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
