import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { AdminDocumentTypeInput } from './dto/inputs/admin-document-type.input';
import { AdminDocumentTypeResponseType } from './dto/types/admin-document-type.type';
import { AdminDocumentTypeSearchInputArgs } from './dto/args/admin-document-type-search-input.args';
import { AdminEnum } from './enums/admin.enum';

@Injectable()
export class AdminDocumentTypeService {
  private readonly logger = new Logger(AdminDocumentTypeService.name);

  private siproadAdminHost: string = null;
  private siproadAdminApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadAdminHost = this.configService.get('siproadAdminHost');
    this.siproadAdminApiKey = this.configService.get('siproadAdminApiKey');
  }

  update(dto: AdminDocumentTypeInput): Promise<AdminDocumentTypeResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.PATCH;
    const path    = this.siproadAdminHost.concat(AdminEnum.PATH_DOCUMENT_TYPE_UPDATE);
    const headers = { "x-api-key": this.siproadAdminApiKey };
    const body    = dto;

    // * send request
    return this.pfxHttpService.request<AdminDocumentTypeResponseType>(method, path, headers, body)
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

  searchByValues(companyId: string, paginationArgs: SearchPaginationArgs, inputArgs: AdminDocumentTypeSearchInputArgs): Promise<AdminDocumentTypeResponseType>{
    const start = performance.now();
    
    const method  = PfxHttpMethodEnum.GET;
    const path    = this.siproadAdminHost.concat(AdminEnum.PATH_DOCUMENT_TYPE_SEARCH_BY_VALUES).concat(`/${companyId}`);
    const headers = { "x-api-key": this.siproadAdminApiKey };
    const body    = inputArgs;
    const params  = paginationArgs;

    return this.pfxHttpService.request<AdminDocumentTypeResponseType>(method, path, headers, body, params)
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

  delete(id: string): Promise<AdminDocumentTypeResponseType>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.DELETE;
    const path    = this.siproadAdminHost.concat(AdminEnum.PATH_DOCUMENT_TYPE_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadAdminApiKey };
    const body    = {};

    // * send request
    return this.pfxHttpService.request<AdminDocumentTypeResponseType>(method, path, headers, body)
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
