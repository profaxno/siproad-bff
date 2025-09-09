import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { ProductsMovementSearchInputArgs } from './dto/args/products-movement-search-input.args';
import { ProductsMovementInput } from './dto/inputs/products-movement.input';
import { ProductsMovementResponseType } from './dto/types/products-movement.type';
import { ProductsMovementService } from './products-movement.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

import { AdminUserType } from 'src/admin/dto/types/admin-user.type';
import { PermissionsEnum } from 'src/admin/enums/permissions.enum';

@Resolver()
export class ProductsMovementResolver {

  private readonly logger = new Logger(ProductsMovementResolver.name);

  constructor(
    private readonly productsMovementService: ProductsMovementService
  ) {}

  @Mutation(() => ProductsMovementResponseType, { name: 'productsMovementUpdate', description: 'Create/update movement' })
  @UseGuards( JwtAuthGuard )
  update(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_WRITE]) userDto: AdminUserType,
    @Args('movement', { type: () => ProductsMovementInput }) movement: ProductsMovementInput
  ): Promise<ProductsMovementResponseType> {

    // movement.companyId = userDto.companyId;
    movement.userId = userDto.id;
    this.logger.log(`>>> update: movement=${JSON.stringify(movement)}`);
    const start = performance.now();

    return this.productsMovementService.update(movement)
    .then( (response: ProductsMovementResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsMovementResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsMovementResponseType, { name: 'productsMovementSearchByValues', description: 'Search all' })
  @UseGuards( JwtAuthGuard )
  searchByValues(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: ProductsMovementSearchInputArgs
  ): Promise<ProductsMovementResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> searchByValues: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.productsMovementService.searchByValues(companyId, paginationArgs, inputArgs)
    .then( (response: ProductsMovementResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< searchByValues: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsMovementResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Mutation(() => ProductsMovementResponseType, { name: 'productsMovementDelete', description: 'Delete movement' })
  @UseGuards( JwtAuthGuard )
  delete(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_WRITE]) userDto: AdminUserType,
    @Args('id', { type: () => String }, new ParseUUIDPipe()) id: string
  ): Promise<ProductsMovementResponseType> {

    this.logger.log(`>>> delete: id=${id}`);
    const start = performance.now();

    return this.productsMovementService.delete(id)
    .then( (response: ProductsMovementResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< delete: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsMovementResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}