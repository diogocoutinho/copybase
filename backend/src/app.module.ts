import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/passaport.strategy';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:test@mongo:27017/copybase_teste?authSource=admin',
    ),
    UsersModule,
    SubscribersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
