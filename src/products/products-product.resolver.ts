import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { ProductsProductInput } from './dto/inputs/products-product.input';
import { ProductsProductResponseType } from './dto/types/products-product-response.type';
import { ProductsProductService } from './products-product.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

import { AdminUserType } from 'src/admin/dto/types';
import { PermissionsEnum } from 'src/admin/enums/permissions.enum';
import { ProductsProductSearchInputArgs } from './dto/args/products-product-search-input.args';


@Resolver()
export class ProductsProductResolver {

  private readonly logger = new Logger(ProductsProductResolver.name);

  constructor(
    private readonly productsProductService: ProductsProductService,
  ) {}

  @Mutation(() => ProductsProductResponseType, { name: 'productsProductUpdate', description: 'Create/update product' })
  @UseGuards( JwtAuthGuard )
  update(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_WRITE]) userDto: AdminUserType,
    @Args('product', { type: () => ProductsProductInput }) product: ProductsProductInput
  ): Promise<ProductsProductResponseType> {

    product.companyId = userDto.companyId;
    this.logger.log(`>>> update: product=${JSON.stringify(product)}`);
    const start = performance.now();

    return this.productsProductService.update(product)
    .then( (response: ProductsProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsProductResponseType, { name: 'productsProductSearchByValues', description: 'Search all' })
  @UseGuards( JwtAuthGuard )
  searchByValues(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: ProductsProductSearchInputArgs
  ): Promise<ProductsProductResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> searchByValues: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.productsProductService.searchByValues(companyId, paginationArgs, inputArgs)
    .then( (response: ProductsProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< searchByValues: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  // @Query(() => ProductsProductResponseType, { name: 'productsProductFind', description: 'Find all' })
  // @UseGuards( JwtAuthGuard )
  // find(
  //   @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
  //   @Args() paginationArgs: SearchPaginationArgs,
  //   @Args() inputArgs: SearchInputArgs
  // ): Promise<ProductsProductResponseType> {

  //   const companyId = userDto.companyId;
  //   this.logger.log(`>>> find: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
  //   const start = performance.now();

  //   return this.productsProductService.find(companyId, paginationArgs, inputArgs)
  //   .then( (response: ProductsProductResponseType) => {
  //     const end = performance.now();
  //     this.logger.log(`<<< find: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
  //     return response;
  //   })
  //   .catch((error) => {
  //     this.logger.error(error.stack);
  //     return new ProductsProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  //   })
  // }

  // @Query(() => ProductsProductResponseType, { name: 'productsProductFindOneById', description: 'Find one by id' })
  // @UseGuards( JwtAuthGuard )
  // findByValue(
  //   @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
  //   @Args('value', { type: () => String }) value: string
  // ): Promise<ProductsProductResponseType> {

  //   const companyId = userDto.companyId;
  //   this.logger.log(`>>> findByValue: companyId=${companyId}, value=${value}`);
  //   const start = performance.now();

  //   return this.productsProductService.findByValue(companyId, value)
  //   .then( (response: ProductsProductResponseType) => {
  //     const end = performance.now();
  //     this.logger.log(`<<< findByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
  //     return response;
  //   })
  //   .catch((error) => {
  //     this.logger.error(error.stack);
  //     return new ProductsProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  //   })
  // }

  @Mutation(() => ProductsProductResponseType, { name: 'productsProductDelete', description: 'Delete product' })
  @UseGuards( JwtAuthGuard )
  delete(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_WRITE]) userDto: AdminUserType,
    @Args('id', { type: () => String }, new ParseUUIDPipe()) id: string
  ): Promise<ProductsProductResponseType> {

    this.logger.log(`>>> delete: id=${id}`);
    const start = performance.now();

    return this.productsProductService.delete(id)
    .then( (response: ProductsProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< delete: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}