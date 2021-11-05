import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:4444/newone'),
    UserModule,
    AuthModule,
    CaslModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: false,
      playground: true,
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
