import { IsString, IsEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  @IsEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsEmpty()
  username: string;
}

export class userParamsDto {
  email: string;
}
