import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PaginationArgs } from '../common/dto/args/pagination.args';
import { SearchArgs } from 'src/common/dto/args/search.args';
import { HttpMethodKey } from 'src/common/enum/http-method.enum';
import { CommonService } from 'src/common/common.service';

import { ProductsElementResponseDto } from './dto/products-response-dto';
import { ProductsElementDto } from './dto/products-element.dto';
import { ProductsEnum } from './enum/products.enum';

@Injectable()
export class ProductsElementService {
  private readonly logger = new Logger(ProductsElementService.name);

  private siproadProductsHost: string = null;
  private siproadProductsApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly commonService: CommonService
  ) { 
    this.siproadProductsHost = this.configService.get('siproadProductsHost');
    this.siproadProductsApiKey = this.configService.get('siproadProductsApiKey');
  }

  updateElement(elementDto: ProductsElementDto): Promise<ProductsElementResponseDto>{
    const start = performance.now();

    // * generate request values
    const method  = HttpMethodKey.PATCH;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_ELEMENTS_UPDATE);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = elementDto;

    // * send request
    return this.commonService.request<ProductsElementResponseDto>(method, path, headers, body)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`updateElement: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`updateElement: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`updateElement: ${error}`);
      throw error;
    })
  }

  findElements(companyId: string, paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<ProductsElementResponseDto>{
    const start = performance.now();
    
    const method  = HttpMethodKey.GET;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_ELEMENTS_SEARCH).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = searchArgs;
    const params  = paginationArgs;

    return this.commonService.request<ProductsElementResponseDto>(method, path, headers, body, params)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`findElements: Error, response=${JSON.stringify(response)}`);

      // // * filter
      // if(searchArgs.search)
      //   response.payload = response.payload.filter(value => value.name.includes(searchArgs.search))

      // if(searchArgs.searchList)
      //   response.payload = response.payload.filter(value => searchArgs.searchList.includes(value.name))
      
      const end = performance.now();
      this.logger.log(`findElements: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`findElements: ${error}`);
      throw error;
    })
  }

  findOneElementByValue(companyId: string, value: string): Promise<ProductsElementResponseDto>{
    const start = performance.now();
    
    const method  = HttpMethodKey.GET;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_ELEMENTS_SEARCH).concat(`/${companyId}`).concat(`/${value}`);
    const headers = { "x-api-key": this.siproadProductsApiKey };
    
    return this.commonService.request<ProductsElementResponseDto>(method, path, headers)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`findOneElementByValue: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`findOneElementByValue: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`findOneElementByValue: ${error}`);
      throw error;
    })
  }

  deleteElement(id: string): Promise<ProductsElementResponseDto>{
    const start = performance.now();

    // * generate request values
    const method  = HttpMethodKey.DELETE;
    const path    = this.siproadProductsHost.concat(ProductsEnum.PATH_ELEMENTS_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadProductsApiKey };
    const body    = {};

    // * send request
    return this.commonService.request<ProductsElementResponseDto>(method, path, headers, body)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.CREATED || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`deleteElement: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`deleteElement: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`deleteElement: ${error}`);
      throw error;
    })
  }

}
