import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchPaginationArgs } from '../common/dto/args';

import { InventoryEnum } from './enums/inventory.enum';
import { InventoryProductResponseType } from './dto/types/inventory-product-response.type';
import { InventoryProductInput } from './dto/inputs/inventory-product.input';
import { InventoryProductSearchInputArgs } from './dto/args/inventory-product-search-input.args';

@Injectable()
export class InventoryProductService {
  private readonly logger = new Logger(InventoryProductService.name);

  private siproadInventoryHost: string = null;
  private siproadInventoryApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadInventoryHost = this.configService.get('siproadInventoryHost');
    this.siproadInventoryApiKey = this.configService.get('siproadInventoryApiKey');
  }

  update(dto: InventoryProductInput): Promise<InventoryProductResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.PATCH;
    const path    = this.siproadInventoryHost.concat(InventoryEnum.PATH_PRODUCTS_UPDATE);
    const headers = { "x-api-key": this.siproadInventoryApiKey };
    const body    = dto;

    // * send request
    return this.pfxHttpService.request<InventoryProductResponseType>(method, path, headers, body)
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

  searchByValues(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: InventoryProductSearchInputArgs): Promise<InventoryProductResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadInventoryHost.concat(InventoryEnum.PATH_PRODUCTS_SEARCH_BY_VALUES).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadInventoryApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<InventoryProductResponseType>(method, path, headers, body, params)
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

  // find(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: SearchInputArgs): Promise<InventoryProductResponseType>{
  //   const start = performance.now();
    
  //   const method  = PfxHttpMethodEnum.GET;
  //   const path    = this.siproadInventoryHost.concat(InventoryEnum.PATH_PRODUCTS_SEARCH).concat(`/${companyId}`);
  //   const headers = { "x-api-key": this.siproadInventoryApiKey };
  //   const body    = inputArgs;
  //   const params  = paginationArgs;

  //   return this.pfxHttpService.request<InventoryProductResponseType>(method, path, headers, body, params)
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

  // findByValue(companyId: string, value: string): Promise<InventoryProductResponseType>{
  //   const start = performance.now();
    
  //   const method  = PfxHttpMethodEnum.GET;
  //   const path    = this.siproadInventoryHost.concat(InventoryEnum.PATH_PRODUCTS_SEARCH_VALUE).concat(`/${companyId}`).concat(`/${value}`);
  //   const headers = { "x-api-key": this.siproadInventoryApiKey };

  //   return this.pfxHttpService.request<InventoryProductResponseType>(method, path, headers)
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

  delete(id: string): Promise<InventoryProductResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.DELETE;
    const path    = this.siproadInventoryHost.concat(InventoryEnum.PATH_PRODUCTS_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadInventoryApiKey };
    const body    = {};

    // * send request
    return this.pfxHttpService.request<InventoryProductResponseType>(method, path, headers, body)
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
