import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt_decode from 'jwt-decode';
import { UserPayload } from '../types/UserPayload';
import { UserType } from 'src/user/types/user.types';
import { MessagesHelper } from '../helpers/messages.helper';

import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { CreateUserBody } from '../types/CreateUserBody';

@Injectable()
export class CreateUserGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UserService,
    private readonly roleServive: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context.getArgs()[0].headers.authorization.split(' ')[1];
    const payload: UserPayload = jwt_decode(token);
    const userRequest = (await this.usersService.findById(
      payload?.sub,
    )) as UserType;

    if (!userRequest) {
      throw new UnauthorizedException(MessagesHelper.AUTH_UNAUTHORIZED);
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const userRoleMatch = roles.filter(
      (role) => role === userRequest.role.name,
    );

    if (userRoleMatch.length === 0) {
      throw new UnauthorizedException(MessagesHelper.AUTH_UNAUTHORIZED);
    }
    if ((userRequest.role.level = 0)) {
      return true;
    }

    const body = context.getArgs()[0].body as CreateUserBody;
    if (!body.role_id) {
      throw new BadRequestException(MessagesHelper.AUTH_ID_ROLE_NOT_VALID);
    }
    const roleNewUser = await this.roleServive.findById(body.role_id);

    if (userRequest.role.level >= roleNewUser.level) {
      throw new UnauthorizedException(MessagesHelper.AUTH_UNAUTHORIZED);
    }

    return true;
  }
}
