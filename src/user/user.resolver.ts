import { UseGuards  } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, DeleteUserResponse, UpdateUserInput } from '../generated/graphql.schema';
import { User } from './schemas/user.schema';
import { Action, AppAbility, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { CheckPermission, PermissionGuard } from '../casl/casl.guard';
import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService, private caslAbilityFactory: CaslAbilityFactory) { }

  @UseGuards(GqlAuthGuard, PermissionGuard)
  @CheckPermission((ability: AppAbility) => ability.can(Action.Create, 'user'))
  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const user = await this.userService.create(input);
    return user;
  }

  @Query('users')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query('user')
  async findOne(@Args('_id') _id: string): Promise<User> {
    return await this.userService.findOne(_id);
  }

  @Mutation('updateUser')
  async updateUser(@Args('input') updateUserInput: UpdateUserInput): Promise<User> {
    return await this.userService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation('removeUser')
  async removeUser(@Args('_id') _id: string): Promise<DeleteUserResponse> {
    await this.userService.remove(_id);
    return {
      success: true,
      message: "Remove user success!"
    }
  }
}
