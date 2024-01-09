import {Controller, Get, Post, Request, UseGuards, Logger, Body} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() req: any) {
    console.log('Login: ', req.email);
    this.logger.log(`AppController: ${req.email} ${req.password}`);
    return this.authService.signIn(req.email, req.password);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
