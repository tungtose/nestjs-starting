import { UpdateUserInput } from '@generated/graphql.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './schemas/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;
  let mockUser = User.makeMockUser();
  let mockUsers = Array(5).fill(6).map(_element => User.makeMockUser());

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findAll: jest.fn().mockResolvedValue(mockUsers),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn(),
            remove: jest.fn(),
          }
        }
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  it('mutation: createUser()', async () => {
    const spy = jest.spyOn(service, 'create').mockResolvedValue(mockUser)
    const user = await resolver.createUser(mockUser)
    expect(spy).toHaveBeenCalledWith(mockUser);
    expect(user).toEqual(mockUser)
  });

  it('mutation: users()', async () => {
    const spy = jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers)
    const users = await resolver.findAll()
    expect(spy).toHaveBeenCalledWith();
    expect(users).toEqual(mockUsers)
  });

  it('mutation: user()', async () => {
    const spy = jest.spyOn(service, 'findOne').mockResolvedValue(mockUser)
    const user = await resolver.findOne(mockUser._id)
    expect(spy).toHaveBeenCalledWith(mockUser._id);
    expect(user).toEqual(mockUser)
  });

  it('mutation: updateUser()', async () => {
    const updateInput: UpdateUserInput = {
      _id: mockUser._id,
      name: 'tungto',
    }
    const spy = jest.spyOn(service, 'update').mockImplementationOnce(() => {
      return Promise.resolve({ ...mockUser, ...updateInput }) as any
    })
    const user = await resolver.updateUser(updateInput)
    expect(spy).toHaveBeenCalledWith(updateInput._id, updateInput);
    expect(user.name).toEqual(updateInput.name)
  });

  it('mutation: removeUser()', async () => {

    const spy = jest.spyOn(service, 'remove').mockImplementationOnce(() => {
      return Promise.resolve(true) as any
    })
    const resolve = await resolver.removeUser(mockUser._id)
    expect(spy).toHaveBeenCalledWith(mockUser._id);
    expect(resolve.success).toBe(true);
  });
});
