import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { SearchPaginationArgs } from '../common/dto/args';

import { ProductsProductUnitSearchInputArgs } from './dto/args/products-product-unit-search-input.args';
import { ProductsProductUnitResponseType } from './dto/types/products-product-unit.type';
import { ProductsProductUnitService } from './products-product-unit.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

import { AdminUserType } from 'src/admin/dto/types/admin-user.type';
import { PermissionsEnum } from 'src/admin/enums/permissions.enum';

@Resolver()
export class ProductsProductUnitResolver {

  private readonly logger = new Logger(ProductsProductUnitResolver.name);

  constructor(
    private readonly productsProductUnitService: ProductsProductUnitService,
  ) {}

  @Query(() => ProductsProductUnitResponseType, { name: 'productsProductUnitSearchByValues', description: 'Search all' })
  @UseGuards( JwtAuthGuard )
  searchByValues(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: ProductsProductUnitSearchInputArgs
  ): Promise<ProductsProductUnitResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> searchByValues: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.productsProductUnitService.searchByValues(companyId, paginationArgs, inputArgs)
    .then( (response: ProductsProductUnitResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< searchByValues: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductUnitResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}