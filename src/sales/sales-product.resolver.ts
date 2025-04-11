import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { SearchPaginationArgs } from '../common/dto/args';

import { SalesProductResponseType } from './dto/types/sales-product-response.type';
import { SalesProductSearchInputArgs } from './dto/args/sales-product-search-input.args';
import { SalesProductService } from './sales-product.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

import { AdminUserType } from 'src/admin/dto/types';
import { PermissionsEnum } from 'src/admin/enums/permissions.enum';

@Resolver()
export class SalesProductResolver {

  private readonly logger = new Logger(SalesProductResolver.name);

  constructor(
    private readonly salesProductService: SalesProductService,
  ) {}

  @Query(() => SalesProductResponseType, { name: 'salesProductSearchByValues', description: 'Search all' })
  @UseGuards( JwtAuthGuard )
  salesProductSearchByValues(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: SalesProductSearchInputArgs
  ): Promise<SalesProductResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> salesProductSearchByValues: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.salesProductService.salesProductSearchByValues(companyId, paginationArgs, inputArgs)
    .then( (response: SalesProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< salesProductSearchByValues: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new SalesProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  // @Query(() => SalesProductResponseType, { name: 'salesProductFind', description: 'Find all' })
  // @UseGuards( JwtAuthGuard )
  // find(
  //   @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
  //   @Args() paginationArgs: SearchPaginationArgs,
  //   @Args() inputArgs: SearchInputArgs
  // ): Promise<SalesProductResponseType> {

  //   const companyId = userDto.companyId;
  //   this.logger.log(`>>> find: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
  //   const start = performance.now();

  //   return this.salesProductService.find(companyId, paginationArgs, inputArgs)
  //   .then( (response: SalesProductResponseType) => {
  //     const end = performance.now();
  //     this.logger.log(`<<< find: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
  //     return response;
  //   })
  //   .catch((error) => {
  //     this.logger.error(error.stack);
  //     return new SalesProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  //   })
  // }

  // @Query(() => SalesProductResponseType, { name: 'salesProductFindOneById', description: 'Find one by id' })
  // @UseGuards( JwtAuthGuard )
  // findByValue(
  //   @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
  //   @Args('value', { type: () => String }) value: string
  // ): Promise<SalesProductResponseType> {

  //   const companyId = userDto.companyId;
  //   this.logger.log(`>>> findByValue: companyId=${companyId}, value=${value}`);
  //   const start = performance.now();

  //   return this.salesProductService.findByValue(companyId, value)
  //   .then( (response: SalesProductResponseType) => {
  //     const end = performance.now();
  //     this.logger.log(`<<< findByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
  //     return response;
  //   })
  //   .catch((error) => {
  //     this.logger.error(error.stack);
  //     return new SalesProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  //   })
  // }

}