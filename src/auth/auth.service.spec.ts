import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@user/schemas/user.schema';
import { UserService } from '../user/user.service';
import * as faker from 'faker';
import { nanoid } from 'nanoid';
import { AuthService } from './auth.service';

const makeMockUser = (): User => ({
  _id: nanoid(24),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'admin',
  avatar: faker.internet.avatar(),
});

describe('AuthService', () => {
  let service: AuthService;
  const mockUser = makeMockUser();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            findByEmail: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue('abc'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

