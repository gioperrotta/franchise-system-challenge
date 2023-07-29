import { Injectable } from '@nestjs/common';
import { CreateFranchiseUnitDto } from './dto/create-franchise-unit.dto';
import { UpdateFranchiseUnitDto } from './dto/update-franchise-unit.dto';

@Injectable()
export class FranchiseUnitService {
  create(createFranchiseUnitDto: CreateFranchiseUnitDto) {
    return 'This action adds a new franchiseUnit';
  }

  findAll() {
    return `This action returns all franchiseUnit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} franchiseUnit`;
  }

  update(id: number, updateFranchiseUnitDto: UpdateFranchiseUnitDto) {
    return `This action updates a #${id} franchiseUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} franchiseUnit`;
  }
}
