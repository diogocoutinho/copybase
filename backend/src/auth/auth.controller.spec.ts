import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: {
    signIn: jest.Mock<any, any, any>;
    register: jest.Mock<any, any, any>;
    logout: jest.Mock<any, any, any>;
  };

  beforeEach(async () => {
    service = {
      signIn: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login a user', async () => {
    const loginUserDto = new LoginUserDto();
    service.signIn.mockResolvedValue('success');
    expect(await controller.login(loginUserDto)).toBe('success');
  });

  it('should register a user', async () => {
    const createUserDto = new CreateUserDto();
    service.register.mockResolvedValue('success');
    expect(await controller.register(createUserDto)).toBe('success');
  });

  it('should logout a user', async () => {
    service.logout.mockResolvedValue('success');
    expect(await controller.logout()).toBe('success');
  });
});
