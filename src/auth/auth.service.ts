import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@user/schemas/user.schema';
import { JwtPayload } from './interfaces/user-payload.interfaces';
import { SignInInput, SignInResponse } from '@generated/graphql.schema';
import { scryptSync, timingSafeEqual } from 'crypto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByPassword(
    loginAttempt: SignInInput,
  ): Promise<SignInResponse | undefined> {

    const { email, password } = loginAttempt;

    const user = await this.userService.findByEmail(email);

    if (!user || !this.verifyPassword(user.password, password)) {
      throw new Error('Invalid login or password');
    }

    const { data, token } = this.createJwt(user);

    return {
      token,
      message: 'sign in success',
      error: false,
    };
  }


  async verifyPassword(dbPassword: string, inputPassword: string): Promise<boolean> {
    try {
      const [salt, key] = dbPassword.split(':');
      const keyBuffer = Buffer.from(key, 'hex');
      const derivedKey = scryptSync(inputPassword, salt, 64);
      return timingSafeEqual(keyBuffer, derivedKey);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  /**
  * Creates a JwtPayload for the given User
  *
  * @param {User} user
  * @returns {{ data: JwtPayload; token: string }} The data contains the email, username, and expiration of the
  * token depending on the environment variable. Expiration could be undefined if there is none set. token is the
  * token created by signing the data.
  * @memberof AuthService
  */
  createJwt(user: User): { data: JwtPayload; token: string } {
    const expiresIn = 3600;
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }
    const data: JwtPayload = {
      email: user.email,
      name: user.name,
      expiration,
      _id: user._id,
      role: 'slave',
      permissions: [{ action: 'create', subject: 'user' }]
    };

    const jwt = this.jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }
}