import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/isPublic.decorator';
import jwt_decode from 'jwt-decode';
import { UserPayload } from '../types/UserPayload';

import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { MessagesHelper } from '../helpers/messages.helper';
import { UserType } from 'src/user/types/user.types';

@Injectable()
export class AccessRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UserService,
    private readonly roleServive: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const token = context.getArgs()[0].headers.authorization.split(' ')[1];
    const payload: UserPayload = jwt_decode(token);
    const userRequest = (await this.usersService.findById(
      payload?.sub,
    )) as UserType;

    if (!userRequest) {
      throw new UnauthorizedException(MessagesHelper.AUTH_UNAUTHORIZED);
    }
    if (userRequest.role.level === 0) {
      return true;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const userRoleMatch = roles.filter(
      (role) => role === userRequest.role.name,
    );

    if (userRoleMatch.length === 0) {
      throw new UnauthorizedException(MessagesHelper.AUTH_UNAUTHORIZED);
    }

    return true;
  }
}
