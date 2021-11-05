import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { UpdateUserInput } from '@generated/graphql.schema';
import * as faker from 'faker';


const makeMockUser = (): User => ({
  _id: nanoid(24),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'admin',
  avatar: faker.internet.avatar(),
})

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>
  let mockUser = makeMockUser();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            findById: jest.fn(),
            find: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  it('should be create user', async () => {
    const spy = jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        ...mockUser
      }),
    );
    const newUser = await service.create(mockUser)
    expect(spy).toHaveBeenCalled();
    expect(newUser).toEqual(mockUser);
  })

  it('should be update user', async () => {
    const updateUserInput: UpdateUserInput = {
      _id: mockUser._id,
      name: 'tung to',
    }
    const spy = jest.spyOn(model, 'findByIdAndUpdate').mockImplementationOnce(() =>
      Promise.resolve(updateUserInput) as any
    );
    const updatedUser = await service.update(mockUser._id, mockUser)
    expect(spy).toHaveBeenCalled();
    expect(updatedUser.name).toEqual(updateUserInput.name);
  })

  it('should be delete user', async () => {
    const spy = jest.spyOn(model, 'findByIdAndDelete').mockImplementationOnce(() =>
      Promise.resolve(true) as any
    );
    const deletedUser = await service.remove(mockUser._id)
    expect(spy).toHaveBeenCalled();
    expect(deletedUser).toBe(true);
  })

  it('should return many users', async () => {
    const userArray = new Array(5).fill(0).map(_element => makeMockUser());
    const spy = jest.spyOn(model, 'find').mockImplementationOnce(() =>
      Promise.resolve(userArray) as any
    );
    const users = await service.findAll();
    expect(spy).toHaveBeenCalled();
    expect(users).toEqual(userArray);
  })


  it('should return a user', async () => {
    const spy = jest.spyOn(model, 'findById').mockImplementationOnce(() =>
      Promise.resolve(mockUser) as any
    );
    const user = await service.findOne(mockUser._id);
    expect(spy).toHaveBeenCalled();
    expect(user).toEqual(mockUser);
  })
});
