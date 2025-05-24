import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { InventoryProductInput } from './dto/inputs/inventory-product.input';
import { InventoryProductResponseType } from './dto/types/inventory-product-response.type';
import { InventoryProductService } from './inventory-product.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

import { AdminUserType } from 'src/admin/dto/types';
import { PermissionsEnum } from 'src/admin/enums/permissions.enum';
import { InventoryProductSearchInputArgs } from './dto/args/inventory-product-search-input.args';

@Resolver()
export class InventoryProductResolver {

  private readonly logger = new Logger(InventoryProductResolver.name);

  constructor(
    private readonly inventoryProductService: InventoryProductService,
  ) {}

  @Mutation(() => InventoryProductResponseType, { name: 'inventoryProductUpdate', description: 'Create/update product' })
  @UseGuards( JwtAuthGuard )
  update(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_WRITE]) userDto: AdminUserType,
    @Args('product', { type: () => InventoryProductInput }) product: InventoryProductInput
  ): Promise<InventoryProductResponseType> {

    product.companyId = userDto.companyId;
    this.logger.log(`>>> update: product=${JSON.stringify(product)}`);
    const start = performance.now();

    return this.inventoryProductService.update(product)
    .then( (response: InventoryProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new InventoryProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => InventoryProductResponseType, { name: 'inventoryProductSearchByValues', description: 'Search all' })
  @UseGuards( JwtAuthGuard )
  searchByValues(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: InventoryProductSearchInputArgs
  ): Promise<InventoryProductResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> searchByValues: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.inventoryProductService.searchByValues(companyId, paginationArgs, inputArgs)
    .then( (response: InventoryProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< searchByValues: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new InventoryProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  // @Query(() => InventoryProductResponseType, { name: 'inventoryProductFind', description: 'Find all' })
  // @UseGuards( JwtAuthGuard )
  // find(
  //   @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
  //   @Args() paginationArgs: SearchPaginationArgs,
  //   @Args() inputArgs: SearchInputArgs
  // ): Promise<InventoryProductResponseType> {

  //   const companyId = userDto.companyId;
  //   this.logger.log(`>>> find: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
  //   const start = performance.now();

  //   return this.inventoryProductService.find(companyId, paginationArgs, inputArgs)
  //   .then( (response: InventoryProductResponseType) => {
  //     const end = performance.now();
  //     this.logger.log(`<<< find: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
  //     return response;
  //   })
  //   .catch((error) => {
  //     this.logger.error(error.stack);
  //     return new InventoryProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  //   })
  // }

  // @Query(() => InventoryProductResponseType, { name: 'inventoryProductFindOneById', description: 'Find one by id' })
  // @UseGuards( JwtAuthGuard )
  // findByValue(
  //   @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
  //   @Args('value', { type: () => String }) value: string
  // ): Promise<InventoryProductResponseType> {

  //   const companyId = userDto.companyId;
  //   this.logger.log(`>>> findByValue: companyId=${companyId}, value=${value}`);
  //   const start = performance.now();

  //   return this.inventoryProductService.findByValue(companyId, value)
  //   .then( (response: InventoryProductResponseType) => {
  //     const end = performance.now();
  //     this.logger.log(`<<< findByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
  //     return response;
  //   })
  //   .catch((error) => {
  //     this.logger.error(error.stack);
  //     return new InventoryProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  //   })
  // }

  @Mutation(() => InventoryProductResponseType, { name: 'inventoryProductDelete', description: 'Delete product' })
  @UseGuards( JwtAuthGuard )
  delete(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_WRITE]) userDto: AdminUserType,
    @Args('id', { type: () => String }, new ParseUUIDPipe()) id: string
  ): Promise<InventoryProductResponseType> {

    this.logger.log(`>>> delete: id=${id}`);
    const start = performance.now();

    return this.inventoryProductService.delete(id)
    .then( (response: InventoryProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< delete: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new InventoryProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}