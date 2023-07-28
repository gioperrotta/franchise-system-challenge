import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { hash } from 'bcryptjs';

import { User } from '@prisma/client';
import { MessagesHelper } from './helpers/messages.helper';
import { UserFromJwt } from 'src/auth/types/UserFromJwt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserFromJwt, createUserDto: CreateUserDto): Promise<User> {
    const existsUser = await this.findByEmail(createUserDto.email);
    if (existsUser) {
      throw new BadRequestException(MessagesHelper.USER_CREATE_EXISTS_EMAIL);
    }
    const passwordHashed = await hash(createUserDto.password, 6);
    const newUser = {
      ...createUserDto,
      password: passwordHashed,
    };

    const createdUser = await this.prisma.user.create({ data: newUser });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string): Promise<User> | null {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User> {
    const resultUser = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!resultUser) {
      throw new BadRequestException(MessagesHelper.USER_NOT_FOUND);
    }

    return {
      ...resultUser,
      password: undefined,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto + `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
