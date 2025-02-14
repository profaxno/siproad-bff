import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { ProductsFormulaResponseDto } from './dto/products-response-dto';
import { ProductsFormulaDto } from './dto/products-formula.dto';
import { ProductsEnum } from './enum/products.enum';

@Injectable()
export class ProductsFormulaService {
  private readonly logger = new Logger(ProductsFormulaService.name);

  private siproadHost: string = null;
  private siproadApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadHost = this.configService.get('siproadHost');
    this.siproadApiKey = this.configService.get('siproadApiKey');
  }

  updateFormula(formulaDto: ProductsFormulaDto): Promise<ProductsFormulaResponseDto>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.PATCH;
    const path    = this.siproadHost.concat(ProductsEnum.PATH_FORMULAS_UPDATE);
    const headers = { "x-api-key": this.siproadApiKey };
    const body    = formulaDto;

    // * send request
    return this.pfxHttpService.request<ProductsFormulaResponseDto>(method, path, headers, body)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`updateFormula: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`updateFormula: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`updateFormula: ${error}`);
      throw error;
    })
  }

  findFormulas(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: SearchInputArgs): Promise<ProductsFormulaResponseDto>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadHost.concat(ProductsEnum.PATH_FORMULAS_SEARCH).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<ProductsFormulaResponseDto>(method, path, headers, body, params)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`findFormulas: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`findFormulas: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`findFormulas: ${error}`);
      throw error;
    })
  }

  findOneFormulaByValue(companyId: string, value: string): Promise<ProductsFormulaResponseDto>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadHost.concat(ProductsEnum.PATH_FORMULAS_SEARCH).concat(`/${companyId}`).concat(`/${value}`);
    const headers = { "x-api-key": this.siproadApiKey };

    return this.pfxHttpService.request<ProductsFormulaResponseDto>(method, path, headers)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`findOneFormulaByValue: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`findOneFormulaByValue: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`findOneFormulaByValue: ${error}`);
      throw error;
    })
  }

  deleteFormula(id: string): Promise<ProductsFormulaResponseDto>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.DELETE;
    const path    = this.siproadHost.concat(ProductsEnum.PATH_FORMULAS_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadApiKey };
    const body    = {};

    // * send request
    return this.pfxHttpService.request<ProductsFormulaResponseDto>(method, path, headers, body)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.CREATED || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`deleteFormula: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`deleteFormula: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`deleteFormula: ${error}`);
      throw error;
    })
  }

}
