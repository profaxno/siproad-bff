import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PaginationArgs } from '../common/dto/args/pagination.args';
import { SearchArgs } from 'src/common/dto/args/search.args';
import { HttpMethodKey } from 'src/common/enum/http-method.enum';
import { CommonService } from 'src/common/common.service';

import { ProductsFormulaResponseDto } from './dto/products-response-dto';
import { ProductsFormulaDto } from './dto/products-formula.dto';
import { ProductsEnum } from './enum/products.enum';

@Injectable()
export class ProductsFormulaService {
  private readonly logger = new Logger(ProductsFormulaService.name);

  private siproadProductsHost: string = null;
  private siproadProductsApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly commonService: CommonService
  ) { 
    this.siproadProductsHost = this.configService.get('siproadProductsHost');
    this.siproadProductsApiKey = this.configService.get('siproadProductsApiKey');
  }

  updateFormula(formulaDto: ProductsFormulaDto): Promise<ProductsFormulaResponseDto>{
    const start = performance.now();

    // * generate request values
    const method  = HttpMethodKey.PATCH;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_FORMULAS_UPDATE);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = formulaDto;

    // * send request
    return this.commonService.request<ProductsFormulaResponseDto>(method, path, headers, body)
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

  findFormulas(companyId: string, paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<ProductsFormulaResponseDto>{
    const start = performance.now();
    
    const method  = HttpMethodKey.GET;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_FORMULAS_SEARCH).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = searchArgs;
    const params  = paginationArgs;

    return this.commonService.request<ProductsFormulaResponseDto>(method, path, headers, body, params)
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
    
    const method  = HttpMethodKey.GET;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_FORMULAS_SEARCH).concat(`/${companyId}`).concat(`/${value}`);
    const headers = { "x-api-key": this.siproadProductsApiKey };

    return this.commonService.request<ProductsFormulaResponseDto>(method, path, headers)
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
    const method  = HttpMethodKey.DELETE;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_FORMULAS_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = {};

    // * send request
    return this.commonService.request<ProductsFormulaResponseDto>(method, path, headers, body)
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
