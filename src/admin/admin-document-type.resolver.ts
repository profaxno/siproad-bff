import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { AdminDocumentTypeInput } from './dto/inputs/admin-document-type.input';
import { AdminDocumentTypeType, AdminDocumentTypeResponseType } from './dto/types/admin-document-type.type';
import { AdminDocumentTypeService } from './admin-document-type.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

import { AdminUserType } from './dto/types/admin-user.type';
import { PermissionsEnum } from './enums/permissions.enum';
import { AdminDocumentTypeSearchInputArgs } from './dto/args/admin-document-type-search-input.args';

@Resolver()
export class AdminDocumentTypeResolver {

  private readonly logger = new Logger(AdminDocumentTypeResolver.name);

  constructor(
    private readonly adminDocumentTypeService: AdminDocumentTypeService,
  ) {}

  @Mutation(() => AdminDocumentTypeResponseType, { name: 'adminDocumentTypeUpdate', description: 'Create/update' })
  @UseGuards( JwtAuthGuard )
  update(
    @CurrentUser([PermissionsEnum.SIPROAD_ADMIN, PermissionsEnum.ADMIN_USER_WRITE]) userDto: AdminUserType, // TODO: revisar permiso
    @Args('documentType', { type: () => AdminDocumentTypeInput }) user: AdminDocumentTypeInput
  ): Promise<AdminDocumentTypeResponseType> {

    this.logger.log(`>>> update: user=${JSON.stringify(user)}`);
    const start = performance.now();

    // * validate companyId if user is SIPROAD_ADMIN and companyId is not set
    const found = userDto.permissionList.find( (permission) => permission.code === PermissionsEnum.SIPROAD_ADMIN );
    if (found && !user.companyId) {
      return Promise.resolve(new AdminDocumentTypeResponseType(HttpStatus.BAD_REQUEST, 'CompanyId is required'));
    }

    user.companyId = found ? user.companyId: userDto.companyId;

    return this.adminDocumentTypeService.update(user)
    .then( (response: AdminDocumentTypeResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminDocumentTypeResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => AdminDocumentTypeResponseType, { name: 'adminDocumentTypeSearchByValues', description: 'Search all' })
  @UseGuards( JwtAuthGuard )
  searchByValues(
    @CurrentUser([PermissionsEnum.PURCHASES_ORDER_READ]) userDto: AdminUserType, 
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: AdminDocumentTypeSearchInputArgs
  ): Promise<AdminDocumentTypeResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> searchByValues: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.adminDocumentTypeService.searchByValues(companyId, paginationArgs, inputArgs)
    .then( (response: AdminDocumentTypeResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< searchByValues: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminDocumentTypeResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Mutation(() => AdminDocumentTypeResponseType, { name: 'adminDocumentTypeDelete', description: 'Delete' })
  @UseGuards( JwtAuthGuard )
  delete(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_WRITE]) userDto: AdminUserType,
    @Args('id', { type: () => String }, new ParseUUIDPipe()) id: string
  ): Promise<AdminDocumentTypeResponseType> {

    this.logger.log(`>>> delete: id=${id}`);
    const start = performance.now();

    return this.adminDocumentTypeService.delete(id)
    .then( (response: AdminDocumentTypeResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< delete: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminDocumentTypeResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}