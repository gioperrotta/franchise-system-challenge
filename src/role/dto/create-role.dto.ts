import { IsInt, Max, Min, MinLength } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

export class CreateRoleDto {
  @MinLength(4, { message: MessagesHelper.ROLE_NAME_NOT_VALID })
  name: string;

  @MinLength(8, { message: MessagesHelper.ROLE_NAME_NOT_VALID })
  description: string;

  @IsInt({ message: MessagesHelper.ROLE_LEVEL_NOT_VALID })
  @Min(0, { message: MessagesHelper.ROLE_LEVEL_LESS_THAN_MIN })
  @Max(9, { message: MessagesHelper.ROLE_LEVEL_GREATER_THAN_MAX })
  level: number;
}
