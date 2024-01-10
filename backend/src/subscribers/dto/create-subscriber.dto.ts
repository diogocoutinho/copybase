export class CreateSubscriberDto {
  frequency: string;
  billing_quantity: string;
  billing_cycle: string;
  start_date: Date;
  status: string;
  status_date: Date;
  cancellation_date: Date;
  value: string;
  next_cycle_date: Date;
  subscriber_id: string;
}
