import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchPaginationArgs } from '../common/dto/args';

import { ProductsEnum } from './enums/products.enum';
import { ProductsProductUnitResponseType } from './dto/types/products-product-unit.type';
import { ProductsProductUnitSearchInputArgs } from './dto/args/products-product-unit-search-input.args';


@Injectable()
export class ProductsProductUnitService {
  private readonly logger = new Logger(ProductsProductUnitService.name);

  private siproadProductsHost: string = null;
  private siproadProductsApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadProductsHost = this.configService.get('siproadProductsHost');
    this.siproadProductsApiKey = this.configService.get('siproadProductsApiKey');
  }

  searchByValues(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: ProductsProductUnitSearchInputArgs): Promise<ProductsProductUnitResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_PRODUCTS_UNIT_SEARCH_BY_VALUES).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<ProductsProductUnitResponseType>(method, path, headers, body, params)
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
