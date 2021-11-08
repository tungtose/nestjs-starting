import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

const mockUser = User.makeMockUser()

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      })],
      providers: [AuthService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create jwt token', async () => {
    const { data, token } = service.createJwt(mockUser)

    console.log("TOKEN:", token)
    expect(token).toBeInstanceOf(String);
  })
});
