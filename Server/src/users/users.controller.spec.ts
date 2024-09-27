import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService], // Add UserService as a provider
    }).compile();

    controller = module.get<UserController>(UserController); // Pass UserController instead of controller
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
