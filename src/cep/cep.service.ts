import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

export interface CepResponse {
  cep: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
}

@Injectable()
export class CepService {
  async getAddressByCep(cep: string): Promise<CepResponse> {
    const regexCEP = /\d{5}[-\s]?\d{3}$/;
    if (!regexCEP.test(cep)) {
      throw new BadRequestException('cep informado não é valodo');
    }
    try {
      const url = process.env.CEP_URL;
      const response = await axios.get<CepResponse>(`${url}/${cep}/json/`);
      return response.data;
    } catch (error) {
      console.log('CEP error ==>', error);
    }
  }
}
