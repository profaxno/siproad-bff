import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchPaginationArgs } from '../common/dto/args';

import { PurchasesEnum } from './enums/purchases.enum';
import { PurchasesTypeSearchInputArgs } from './dto/args/purchases-type-search-input.args';
import { PurchasesTypeResponseType } from './dto/types/purchases-type.type';


@Injectable()
export class PurchasesTypeService {
  private readonly logger = new Logger(PurchasesTypeService.name);

  private siproadPurchasesHost: string = null;
  private siproadPurchasesApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadPurchasesHost = this.configService.get('siproadPurchasesHost');
    this.siproadPurchasesApiKey = this.configService.get('siproadPurchasesApiKey');
  }

  searchByValues(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: PurchasesTypeSearchInputArgs): Promise<PurchasesTypeResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadPurchasesHost.concat(PurchasesEnum.PATH_PURCHASE_TYPE_SEARCH_BY_VALUES).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadPurchasesApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<PurchasesTypeResponseType>(method, path, headers, body, params)
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
