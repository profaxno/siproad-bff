import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchPaginationArgs } from '../common/dto/args';

import { PurchasesEnum } from './enums/purchases.enum';
import { PurchasesOrderSearchInputArgs } from './dto/args/purchases-order-search-input.args';
import { PurchasesOrderInput } from './dto/inputs/purchases-order.input';
import { PurchasesOrderResponseType } from './dto/types/purchases-order.type';

@Injectable()
export class PurchasesOrderService {
  private readonly logger = new Logger(PurchasesOrderService.name);

  private siproadPurchasesHost: string = null;
  private siproadPurchasesApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadPurchasesHost = this.configService.get('siproadPurchasesHost');
    this.siproadPurchasesApiKey = this.configService.get('siproadPurchasesApiKey');
  }

  update(dto: PurchasesOrderInput): Promise<PurchasesOrderResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.PATCH;
    const path    = this.siproadPurchasesHost.concat(PurchasesEnum.PATH_ORDERS_UPDATE);
    const headers = { "x-api-key": this.siproadPurchasesApiKey };
    const body    = dto;

    // * send request
    return this.pfxHttpService.request<PurchasesOrderResponseType>(method, path, headers, body)
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

  searchByValues(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: PurchasesOrderSearchInputArgs): Promise<PurchasesOrderResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadPurchasesHost.concat(PurchasesEnum.PATH_ORDERS_SEARCH_BY_VALUES).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadPurchasesApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<PurchasesOrderResponseType>(method, path, headers, body, params)
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

}
