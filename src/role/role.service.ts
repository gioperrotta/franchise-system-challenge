import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesHelper } from './helpers/messages.helper';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    const existsRole = await this.prisma.role.findFirst({ where: { name } });
    if (existsRole) {
      throw new BadRequestException(MessagesHelper.ROLE_NAME_ALREDY_EXISTS);
    }
    const createdRole = await this.prisma.role.create({ data: createRoleDto });
    return createdRole;
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
