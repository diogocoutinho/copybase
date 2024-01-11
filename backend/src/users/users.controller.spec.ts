import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: {
    findOne: jest.Mock<any, any, any>;
    create: jest.Mock<any, any, any>;
    update: jest.Mock<any, any, any>;
    updateOne: jest.Mock<any, any, any>;
    findAll: jest.Mock<any, any, any>;
    remove: jest.Mock<any, any, any>;
  };

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      updateOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const userDto = new CreateUserDto();
    service.create.mockResolvedValue(userDto);
    expect(await controller.create(userDto)).toBe(userDto);
  });

  it('should find all users', async () => {
    const userDto = { email: 'test@test.com', password: 'test' };
    service.findAll.mockResolvedValue([userDto]);
    expect(await controller.findAll()).toEqual([userDto]);
  });

  it('should find one user', async () => {
    const userDto = { email: 'test@test.com', password: 'test' };
    service.findOne.mockResolvedValue(userDto);
    expect(await controller.findOne('1')).toEqual(userDto);
  });

  it('should update a user', async () => {
    const userDto = { email: 'test@test.com', password: 'test' };
    service.update.mockResolvedValue(userDto);
    expect(await controller.update('1', userDto)).toEqual(userDto);
  });

  it('should update one user', async () => {
    const userDto = { email: 'test@test.com', password: 'test' };
    service.updateOne.mockResolvedValue(userDto);
    expect(await controller.updateOne('1', userDto)).toEqual(userDto);
  });

  it('should remove a user', async () => {
    const userDto = { email: 'test@test.com', password: 'test' };
    service.remove.mockResolvedValue(userDto);
    expect(await controller.remove('1')).toEqual(userDto);
  });
});
