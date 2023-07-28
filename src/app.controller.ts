import { Controller, Get, Param } from '@nestjs/common';
import { IsPublic } from './auth/decorators/isPublic.decorator';
import { CepResponse, CepService } from './cep/cep.service';

@Controller()
export class AppController {
  constructor(private readonly cepService: CepService) {}

  @IsPublic()
  @Get('hello')
  getHello(): string {
    return 'Hello World';
  }

  @IsPublic()
  @Get('consulta-cep/:cep')
  getAddress(@Param('cep') cep: string) {
    return this.cepService.getAddressByCep(cep);
  }
}
