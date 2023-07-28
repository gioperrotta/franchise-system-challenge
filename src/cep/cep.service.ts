import { Injectable } from '@nestjs/common';
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
    const url = process.env.CEP_URL;
    const response = await axios.get<CepResponse>(`${url}/${cep}/json/`);
    return response.data;
  }
}
