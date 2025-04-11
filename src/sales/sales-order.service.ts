import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchPaginationArgs } from '../common/dto/args';

import { SalesEnum } from './enums/sales.enum';
import { SalesOrderInput } from './dto/inputs/sales-order.input';
import { SalesOrderSearchInputArgs } from './dto/args/sales-order-search-input.args';
import { SalesOrderResponseType } from './dto/types/sales-order-response.type';

@Injectable()
export class SalesOrderService {
  private readonly logger = new Logger(SalesOrderService.name);

  private siproadSalesHost: string = null;
  private siproadSalesApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadSalesHost = this.configService.get('siproadSalesHost');
    this.siproadSalesApiKey = this.configService.get('siproadSalesApiKey');
  }

  update(dto: SalesOrderInput): Promise<SalesOrderResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.PATCH;
    const path    = this.siproadSalesHost.concat(SalesEnum.PATH_ORDERS_UPDATE);
    const headers = { "x-api-key": this.siproadSalesApiKey };
    const body    = dto;

    // * send request
    return this.pfxHttpService.request<SalesOrderResponseType>(method, path, headers, body)
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

  salesOrderSearchByValues(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: SalesOrderSearchInputArgs): Promise<SalesOrderResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadSalesHost.concat(SalesEnum.PATH_ORDERS_SEARCH_BY_VALUES).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadSalesApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<SalesOrderResponseType>(method, path, headers, body, params)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`find: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`find: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`find: ${error}`);
      throw error;
    })
  }

  // find(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: SearchInputArgs): Promise<SalesOrderResponseType>{
  //   const start = performance.now();
    
  //   const method  = PfxHttpMethodEnum.GET;
  //   const path    = this.siproadSalesHost.concat(SalesEnum.PATH_ORDERS_SEARCH).concat(`/${companyId}`);
  //   const headers = { "x-api-key": this.siproadSalesApiKey };
  //   const body    = inputArgs;
  //   const params  = paginationArgs;

  //   return this.pfxHttpService.request<SalesOrderResponseType>(method, path, headers, body, params)
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

  // findByValue(companyId: string, value: string): Promise<SalesOrderResponseType>{
  //   const start = performance.now();
    
  //   const method  = PfxHttpMethodEnum.GET;
  //   const path    = this.siproadSalesHost.concat(SalesEnum.PATH_ORDERS_SEARCH_VALUE).concat(`/${companyId}`).concat(`/${value}`);
  //   const headers = { "x-api-key": this.siproadSalesApiKey };

  //   return this.pfxHttpService.request<SalesOrderResponseType>(method, path, headers)
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

  // delete(id: string): Promise<SalesOrderResponseType>{
  //   const start = performance.now();

  //   // * generate request values
  //   const method  = PfxHttpMethodEnum.DELETE;
  //   const path    = this.siproadSalesHost.concat(SalesEnum.PATH_ORDERS_DELETE).concat(`/${id}`);;
  //   const headers = { "x-api-key": this.siproadSalesApiKey };
  //   const body    = {};

  //   // * send request
  //   return this.pfxHttpService.request<SalesOrderResponseType>(method, path, headers, body)
  //   .then(response => {

  //     if ( !(
  //       response.internalCode == HttpStatus.OK || 
  //       response.internalCode == HttpStatus.CREATED || 
  //       response.internalCode == HttpStatus.BAD_REQUEST || 
  //       response.internalCode == HttpStatus.NOT_FOUND) )
  //       throw new Error(`delete: Error, response=${JSON.stringify(response)}`);

  //     const end = performance.now();
  //     this.logger.log(`delete: OK, runtime=${(end - start) / 1000} seconds`);
  //     return response;
  //   })
  //   .catch(error => {
  //     this.logger.error(`delete: ${error}`);
  //     throw error;
  //   })
  // }

}
