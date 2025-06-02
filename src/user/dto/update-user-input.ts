/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Optional } from '@nestjs/common';
import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @Optional()
  name: string;

  @IsString()
  @IsEmail()
  @Optional()
  email: string;
}
