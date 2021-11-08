import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaslModule } from './casl/casl.module';

const mongoUrl = 'mongodb+srv://datasean:PZHNNmOravk4kf3U@datasean-staging.xr84e.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-fke0d0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
const mongoUrlTemp = 'mongodb://localhost:4444/newone'

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl),
    UserModule,
    AuthModule,
    CaslModule,

    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: false,
      playground: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => {

        return { req }
      }
    }),

  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})

export class AppModule { }
