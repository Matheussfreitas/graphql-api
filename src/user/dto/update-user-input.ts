/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Optional } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Optional()
  name: string;

  @Field()
  @IsString()
  @IsEmail()
  @Optional()
  email: string;
}
