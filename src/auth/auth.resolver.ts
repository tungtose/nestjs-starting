import { SignInInput, SignInResponse } from '../generated/graphql.schema';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/schemas/user.schema';
import { AuthenticationError } from 'apollo-server-errors';
import { AuthService } from './auth.service';
import {GqlAuthGuard} from './guards/gql.guard';

@Resolver("Auth")
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation('signIn')
  async login(@Args('input') input: SignInInput): Promise<SignInResponse> {
    const result = await this.authService.validateUserByPassword(input);
    if (result) return result;
    throw new AuthenticationError(
      'Could not log-in with the provided credentials',
    );
  }

  // There is no username guard here because if the person has the token, they can be any user
  // @Mutation('refreshToken')
  // @UseGuards(GqlAuthGuard)
  // async refreshToken(@Context('req') request: any): Promise<string> {
  //   const user: User = request.user;
  //   if (!user)
  //     throw new AuthenticationError(
  //       'Could not log-in with the provided credentials',
  //     );
  //   const result = await this.authService.createJwt(user);

  //   console.log("RESULT")
  //   if (result) return result.token;
  //   throw new AuthenticationError(
  //     'Could not log-in with the provided credentials',
  //   );
  // }
}
