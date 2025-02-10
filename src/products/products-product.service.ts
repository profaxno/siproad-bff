import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PaginationArgs } from '../common/dto/args/pagination.args';
import { SearchArgs } from 'src/common/dto/args/search.args';
import { HttpMethodKey } from 'src/common/enum/http-method.enum';
import { CommonService } from 'src/common/common.service';

import { ProductsProductResponseDto } from './dto/products-response-dto';
import { ProductsProductDto } from './dto/products-product.dto';
import { ProductsEnum } from './enum/products.enum';

@Injectable()
export class ProductsProductService {
  private readonly logger = new Logger(ProductsProductService.name);

  private siproadProductsHost: string = null;
  private siproadProductsApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly commonService: CommonService
  ) { 
    this.siproadProductsHost = this.configService.get('siproadProductsHost');
    this.siproadProductsApiKey = this.configService.get('siproadProductsApiKey');
  }

  updateProduct(formulaDto: ProductsProductDto): Promise<ProductsProductResponseDto>{
    const start = performance.now();

    // * generate request values
    const method  = HttpMethodKey.PATCH;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_PRODUCTS_UPDATE);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = formulaDto;

    // * send request
    return this.commonService.request<ProductsProductResponseDto>(method, path, headers, body)
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

  findProducts(companyId: string, paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<ProductsProductResponseDto>{
    const start = performance.now();
    
    const method  = HttpMethodKey.GET;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_PRODUCTS_SEARCH).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = searchArgs;
    const params  = paginationArgs;

    return this.commonService.request<ProductsProductResponseDto>(method, path, headers, body, params)
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
    
    const method  = HttpMethodKey.GET;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_PRODUCTS_SEARCH).concat(`/${companyId}`).concat(`/${value}`);
    const headers = { "x-api-key": this.siproadProductsApiKey };

    return this.commonService.request<ProductsProductResponseDto>(method, path, headers)
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
    const method  = HttpMethodKey.DELETE;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_PRODUCTS_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = {};

    // * send request
    return this.commonService.request<ProductsProductResponseDto>(method, path, headers, body)
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
