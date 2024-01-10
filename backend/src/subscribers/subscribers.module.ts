import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { SubscriberSchema } from '../schemas/subscribers.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subscriber', schema: SubscriberSchema },
    ]),
  ],
  exports: [SubscribersService],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}
