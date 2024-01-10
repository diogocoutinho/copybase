import { Controller, Get, Post, Logger, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { LoginUserDto } from './users/dto/login-user.dto';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller('auth')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
