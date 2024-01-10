import {
  Controller, Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.subscribersService.processUpload(file);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.subscribersService.findAll();
  }
}
