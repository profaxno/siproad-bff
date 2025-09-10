import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchPaginationArgs } from '../common/dto/args';

import { ProductsEnum } from './enums/products.enum';
import { ProductsMovementResponseType } from './dto/types/products-movement.type';
import { ProductsMovementInput } from './dto/inputs/products-movement.input';
import { ProductsMovementSearchInputArgs } from './dto/args/products-movement-search-input.args';

@Injectable()
export class ProductsMovementService {
  private readonly logger = new Logger(ProductsMovementService.name);

  private siproadProductsHost: string = null;
  private siproadProductsApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadProductsHost = this.configService.get('siproadProductsHost');
    this.siproadProductsApiKey = this.configService.get('siproadProductsApiKey');
  }

  update(dto: ProductsMovementInput): Promise<ProductsMovementResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.PATCH;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_MOVEMENTS_UPDATE);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = dto;

    // * send request
    return this.pfxHttpService.request<ProductsMovementResponseType>(method, path, headers, body)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`update: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`update: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`update: ${error}`);
      throw error;
    })
  }

  searchByValues(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: ProductsMovementSearchInputArgs): Promise<ProductsMovementResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_MOVEMENTS_SEARCH_BY_VALUES).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<ProductsMovementResponseType>(method, path, headers, body, params)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`searchByValues: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`searchByValues: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`searchByValues: ${error}`);
      throw error;
    })
  }

  delete(id: string): Promise<ProductsMovementResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.DELETE;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_MOVEMENTS_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = {};

    // * send request
    return this.pfxHttpService.request<ProductsMovementResponseType>(method, path, headers, body)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.CREATED || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`delete: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`delete: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`delete: ${error}`);
      throw error;
    })
  }

}
