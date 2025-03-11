import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { SalesEnum } from './enums/sales.enum';
import { SalesProductResponseType } from './dto/types/sales-product-response.type';


@Injectable()
export class SalesProductService {
  private readonly logger = new Logger(SalesProductService.name);

  private siproadSalesHost: string = null;
  private siproadSalesApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadSalesHost = this.configService.get('siproadSalesHost');
    this.siproadSalesApiKey = this.configService.get('siproadSalesApiKey');
  }

  find(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: SearchInputArgs): Promise<SalesProductResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadSalesHost.concat(SalesEnum.PATH_PRODUCTS_SEARCH).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadSalesApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<SalesProductResponseType>(method, path, headers, body, params)
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

  findByValue(companyId: string, value: string): Promise<SalesProductResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadSalesHost.concat(SalesEnum.PATH_PRODUCTS_SEARCH_VALUE).concat(`/${companyId}`).concat(`/${value}`);
    const headers = { "x-api-key": this.siproadSalesApiKey };

    return this.pfxHttpService.request<SalesProductResponseType>(method, path, headers)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`findByValue: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`findByValue: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`findByValue: ${error}`);
      throw error;
    })
  }

}
