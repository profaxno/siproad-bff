import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { AdminCompanyInput } from './dto/inputs/admin-company.input';
import { AdminCompanyResponseType } from './dto/types/admin-company-response.type';
import { AdminEnum } from './enums/admin.enum';

@Injectable()
export class AdminCompanyService {
  private readonly logger = new Logger(AdminCompanyService.name);

  private siproadAdminHost: string = null;
  private siproadAdminApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadAdminHost = this.configService.get('siproadAdminHost');
    this.siproadAdminApiKey = this.configService.get('siproadAdminApiKey');
  }

  update(dto: AdminCompanyInput): Promise<AdminCompanyResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.PATCH;
    const path    = this.siproadAdminHost.concat(AdminEnum.PATH_COMPANIES_UPDATE);
    const headers = { "x-api-key": this.siproadAdminApiKey };
    const body    = dto;

    // * send request
    return this.pfxHttpService.request<AdminCompanyResponseType>(method, path, headers, body)
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

  find(paginationArgs: SearchPaginationArgs, inputArgs: SearchInputArgs): Promise<AdminCompanyResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadAdminHost.concat(AdminEnum.PATH_COMPANIES_SEARCH);
    const headers = { "x-api-key": this.siproadAdminApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<AdminCompanyResponseType>(method, path, headers, body, params)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`find: Error, response=${JSON.stringify(response)}`);

      // // * filter
      // if(inputArgs.search)
      //   response.payload = response.payload.filter(value => value.name.includes(inputArgs.search))

      // if(inputArgs.searchList)
      //   response.payload = response.payload.filter(value => inputArgs.searchList.includes(value.name))
      
      const end = performance.now();
      this.logger.log(`find: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`find: ${error}`);
      throw error;
    })
  }

  findByValue(value: string): Promise<AdminCompanyResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadAdminHost.concat(AdminEnum.PATH_COMPANIES_SEARCH_VALUE).concat(`/${value}`);
    const headers = { "x-api-key": this.siproadAdminApiKey };
    
    return this.pfxHttpService.request<AdminCompanyResponseType>(method, path, headers)
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

  delete(id: string): Promise<AdminCompanyResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.DELETE;
    const path    = this.siproadAdminHost.concat(AdminEnum.PATH_COMPANIES_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadAdminApiKey };
    const body    = {};

    // * send request
    return this.pfxHttpService.request<AdminCompanyResponseType>(method, path, headers, body)
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
