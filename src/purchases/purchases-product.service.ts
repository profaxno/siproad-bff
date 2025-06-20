import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchPaginationArgs } from '../common/dto/args';

import { PurchasesEnum } from './enums/purchases.enum';
import { PurchasesProductResponseType } from './dto/types/purchases-product-response.type';
import { PurchasesProductSearchInputArgs } from './dto/args/purchases-product-search-input.args';


@Injectable()
export class PurchasesProductService {
  private readonly logger = new Logger(PurchasesProductService.name);

  private siproadPurchasesHost: string = null;
  private siproadPurchasesApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadPurchasesHost = this.configService.get('siproadPurchasesHost');
    this.siproadPurchasesApiKey = this.configService.get('siproadPurchasesApiKey');
  }

  searchByValues(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: PurchasesProductSearchInputArgs): Promise<PurchasesProductResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadPurchasesHost.concat(PurchasesEnum.PATH_PRODUCTS_SEARCH_BY_VALUES).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadPurchasesApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<PurchasesProductResponseType>(method, path, headers, body, params)
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
