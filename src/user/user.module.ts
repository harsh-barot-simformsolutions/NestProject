import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MiddlewareBuilder } from '@nestjs/core';
import path from 'path';
import { LoggerMiddleware } from './middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  // Global use of UserService
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // you can use here cors() and helmet() also by doing (,cors()) only here
      .forRoutes({ path: 'users', method: RequestMethod.POST });
    // for multiple routes you have to do this
    //apply(LoggerMiddleware).exclude(
    //{path: 'users', method: RequestMethod.POST }
    //path: 'carss', method: RequestMethod.GET }
    // )
  }
}
