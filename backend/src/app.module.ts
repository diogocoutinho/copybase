import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/passaport.strategy';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:test@mongo:27017/copybase_teste?authSource=admin',
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
