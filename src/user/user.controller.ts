import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDto, userParamsDto } from './dto/user.dto';
import { HttpExceptionFilter } from './filter';
import { AuthGuard } from './guard';
import { User } from './interface/user';
import { JoiValidationPipe } from './pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}
  // HTTP GET
  @Get()
  @UseFilters(new HttpExceptionFilter())
  getUser(): User[] {
    return this.userServices.getuser();
  }
  // HTTP POST
  @Post()
  @UsePipes(new JoiValidationPipe({}))
  @UsePipes(new ValidationPipe())
  async postuser(@Body() user: UserDto): Promise<User> {
    return this.userServices.adduser(user);
  }
  //HTTP DELETE
  @Delete(':email')
  @UseGuards(new AuthGuard())
  deleteuser(@Param('email') params: userParamsDto): User[] {
    return this.userServices.deleteuser(params.email);
  }
  //HTTP GetSIngle
  @Get('/:email')
  @UseFilters(new HttpExceptionFilter())
  async getusers(@Param('email') params: userParamsDto): Promise<User> {
    try {
      return await this.userServices.getusers(params.email);
    } catch (error) {
      throw new BadRequestException('Test Here');
    }
  }
}
