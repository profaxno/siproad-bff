import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { ProductsProductResponseDto } from './dto/products-response-dto';
import { ProductsProductDto } from './dto/products-product.dto';
import { ProductsEnum } from './enum/products.enum';

@Injectable()
export class ProductsProductService {
  private readonly logger = new Logger(ProductsProductService.name);

  private siproadHost: string = null;
  private siproadApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadHost = this.configService.get('siproadHost');
    this.siproadApiKey = this.configService.get('siproadApiKey');
  }

  updateProduct(dto: ProductsProductDto): Promise<ProductsProductResponseDto>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.PATCH;
    const path    = this.siproadHost.concat(ProductsEnum.PATH_PRODUCTS_UPDATE);
    const headers = { "x-api-key": this.siproadApiKey };
    const body    = dto;

    // * send request
    return this.pfxHttpService.request<ProductsProductResponseDto>(method, path, headers, body)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`updateProduct: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`updateProduct: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`updateProduct: ${error}`);
      throw error;
    })
  }

  findProducts(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: SearchInputArgs): Promise<ProductsProductResponseDto>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadHost.concat(ProductsEnum.PATH_PRODUCTS_SEARCH).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<ProductsProductResponseDto>(method, path, headers, body, params)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`findProducts: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`findProducts: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`findProducts: ${error}`);
      throw error;
    })
  }

  findOneProductByValue(companyId: string, value: string): Promise<ProductsProductResponseDto>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadHost.concat(ProductsEnum.PATH_PRODUCTS_SEARCH).concat(`/${companyId}`).concat(`/${value}`);
    const headers = { "x-api-key": this.siproadApiKey };

    return this.pfxHttpService.request<ProductsProductResponseDto>(method, path, headers)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`findOneProductByValue: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`findOneProductByValue: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`findOneProductByValue: ${error}`);
      throw error;
    })
  }

  deleteProduct(id: string): Promise<ProductsProductResponseDto>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.DELETE;
    const path    = this.siproadHost.concat(ProductsEnum.PATH_PRODUCTS_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadApiKey };
    const body    = {};

    // * send request
    return this.pfxHttpService.request<ProductsProductResponseDto>(method, path, headers, body)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.CREATED || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`deleteProduct: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`deleteProduct: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`deleteProduct: ${error}`);
      throw error;
    })
  }

}
