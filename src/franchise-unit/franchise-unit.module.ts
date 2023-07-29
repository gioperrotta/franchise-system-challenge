import { Module } from '@nestjs/common';
import { FranchiseUnitService } from './franchise-unit.service';
import { FranchiseUnitController } from './franchise-unit.controller';

@Module({
  controllers: [FranchiseUnitController],
  providers: [FranchiseUnitService]
})
export class FranchiseUnitModule {}
