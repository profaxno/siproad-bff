import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchPaginationArgs } from '../common/dto/args';

import { ProductsEnum } from './enums/products.enum';
import { ProductsProductResponseType } from './dto/types/products-product.type';
import { ProductsProductInput } from './dto/inputs/products-product.input';
import { ProductsProductSearchInputArgs } from './dto/args/products-product-search-input.args';
import { ProductsProductSearchQueryArgs } from './dto/args/products-product-search-query.args';

@Injectable()
export class ProductsProductService {
  private readonly logger = new Logger(ProductsProductService.name);

  private siproadProductsHost: string = null;
  private siproadProductsApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadProductsHost = this.configService.get('siproadProductsHost');
    this.siproadProductsApiKey = this.configService.get('siproadProductsApiKey');
  }

  update(dto: ProductsProductInput): Promise<ProductsProductResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.PATCH;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_PRODUCTS_UPDATE);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = dto;

    // * send request
    return this.pfxHttpService.request<ProductsProductResponseType>(method, path, headers, body)
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

  searchByValues(companyId: string, queryArgs: ProductsProductSearchQueryArgs, inputArgs: ProductsProductSearchInputArgs): Promise<ProductsProductResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_PRODUCTS_SEARCH_BY_VALUES).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = inputArgs;
    const params  = queryArgs;

    return this.pfxHttpService.request<ProductsProductResponseType>(method, path, headers, body, params)
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

  // find(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: SearchInputArgs): Promise<ProductsProductResponseType>{
  //   const start = performance.now();
    
  //   const method  = PfxHttpMethodEnum.GET;
  //   const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_PRODUCTS_SEARCH).concat(`/${companyId}`);
  //   const headers = { "x-api-key": this.siproadProductsApiKey };
  //   const body    = inputArgs;
  //   const params  = paginationArgs;

  //   return this.pfxHttpService.request<ProductsProductResponseType>(method, path, headers, body, params)
  //   .then(response => {

  //     if ( !(
  //       response.internalCode == HttpStatus.OK || 
  //       response.internalCode == HttpStatus.BAD_REQUEST || 
  //       response.internalCode == HttpStatus.NOT_FOUND) )
  //       throw new Error(`find: Error, response=${JSON.stringify(response)}`);

  //     const end = performance.now();
  //     this.logger.log(`find: OK, runtime=${(end - start) / 1000} seconds`);
  //     return response;
  //   })
  //   .catch(error => {
  //     this.logger.error(`find: ${error}`);
  //     throw error;
  //   })
  // }

  // findByValue(companyId: string, value: string): Promise<ProductsProductResponseType>{
  //   const start = performance.now();
    
  //   const method  = PfxHttpMethodEnum.GET;
  //   const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_PRODUCTS_SEARCH_VALUE).concat(`/${companyId}`).concat(`/${value}`);
  //   const headers = { "x-api-key": this.siproadProductsApiKey };

  //   return this.pfxHttpService.request<ProductsProductResponseType>(method, path, headers)
  //   .then(response => {

  //     if ( !(
  //       response.internalCode == HttpStatus.OK || 
  //       response.internalCode == HttpStatus.BAD_REQUEST || 
  //       response.internalCode == HttpStatus.NOT_FOUND) )
  //       throw new Error(`findByValue: Error, response=${JSON.stringify(response)}`);

  //     const end = performance.now();
  //     this.logger.log(`findByValue: OK, runtime=${(end - start) / 1000} seconds`);
  //     return response;
  //   })
  //   .catch(error => {
  //     this.logger.error(`findByValue: ${error}`);
  //     throw error;
  //   })
  // }

  delete(id: string): Promise<ProductsProductResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.DELETE;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_PRODUCTS_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = {};

    // * send request
    return this.pfxHttpService.request<ProductsProductResponseType>(method, path, headers, body)
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
