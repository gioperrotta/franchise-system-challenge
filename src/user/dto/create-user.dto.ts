import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

import { MessagesHelper } from '../helpers/messages.helper';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail({}, { message: MessagesHelper.REGISTER_EMAIL_NOT_VALID })
  email: string;

  @MinLength(6, { message: MessagesHelper.REGISTER_STRONG_PASSWORD })
  @MaxLength(10, { message: MessagesHelper.REGISTER_STRONG_PASSWORD })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: MessagesHelper.REGISTER_STRONG_PASSWORD,
  })
  password: string;

  @MinLength(2, { message: MessagesHelper.REGISTER_NAME_NOT_VALID })
  name: string;
}
