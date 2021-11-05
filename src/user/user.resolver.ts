import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from '@generated/graphql.schema';
import { User } from './schemas/user.schema';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const user = await this.userService.create(input);
    return user;
  }

  // @Query('user')
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Query('user')
  // findOne(@Args('id') id: number) {
  //   return this.userService.findOne(id);
  // }

  // @Mutation('updateUser')
  // update(@Args('updateUserInput') updateUserInput: any) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   return this.userService.remove(id);
  // }
}
