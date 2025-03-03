import { HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from 'src/common/dto/args';

import { AdminCompanyInput } from './dto/inputs/admin-company.input';
import { AdminCompanyResponseType } from './dto/types/admin-company-response.type';
import { AdminCompanyService } from './admin-company.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';
import { PermissionsEnum } from './enums/permissions.enum';
import { AdminUserType } from './dto/types';

@Resolver()
export class AdminCompanyResolver {

  private readonly logger = new Logger(AdminCompanyResolver.name);

  constructor(
    private readonly adminCompanyService: AdminCompanyService,
  ) {}

  @Mutation(() => AdminCompanyResponseType, { name: 'updateCompany', description: 'Create/Update company' })
  @UseGuards( JwtAuthGuard )
  update(
    @CurrentUser([PermissionsEnum.ADMIN_COMPANY_WRITE]) userDto: AdminUserType,
    @Args('company', { type: () => AdminCompanyInput }) company: AdminCompanyInput
  ): Promise<AdminCompanyResponseType> {

    this.logger.log(`>>> update: company=${JSON.stringify(company)}`);
    const start = performance.now();

    return this.adminCompanyService.update(company)
    .then( (response: AdminCompanyResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminCompanyResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => AdminCompanyResponseType, { name: 'findCompanies', description: 'Find all' })
  @UseGuards( JwtAuthGuard )
  find(
    @CurrentUser([PermissionsEnum.ADMIN_COMPANY_READ]) userDto: AdminUserType,
    @Args() paginationArgs: SearchPaginationArgs, @Args() inputArgs: SearchInputArgs
  ): Promise<AdminCompanyResponseType> {

    this.logger.log(`>>> find: paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.adminCompanyService.find(paginationArgs, inputArgs)
    .then( (response: AdminCompanyResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< find: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminCompanyResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => AdminCompanyResponseType, { name: 'findOneCompanyByValue', description: 'Find company by value' })
  @UseGuards( JwtAuthGuard )
  findOneByValue(
    @CurrentUser([PermissionsEnum.ADMIN_COMPANY_READ]) userDto: AdminUserType,
    @Args('value', { type: () => String }) value: string
  ): Promise<AdminCompanyResponseType> {

    this.logger.log(`>>> findOneByValue: value=${value}`);
    const start = performance.now();

    return this.adminCompanyService.findOneByValue(value)
    .then( (response: AdminCompanyResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< findOneByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminCompanyResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  // TODO: falta validar que el id sea un uuid valido
  @Mutation(() => AdminCompanyResponseType, { name: 'deleteCompany', description: 'Delete company' })
  @UseGuards( JwtAuthGuard )
  delete(
    @CurrentUser([PermissionsEnum.ADMIN_COMPANY_WRITE]) userDto: AdminUserType,
    @Args('id', { type: () => String }) id: string
  ): Promise<AdminCompanyResponseType> {

    this.logger.log(`>>> delete: id=${JSON.stringify(id)}`);
    const start = performance.now();

    return this.adminCompanyService.delete(id)
    .then( (response: AdminCompanyResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< delete: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminCompanyResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}