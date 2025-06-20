import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { SearchPaginationArgs } from '../common/dto/args';

import { PurchasesProductResponseType } from './dto/types/purchases-product-response.type';
import { PurchasesProductSearchInputArgs } from './dto/args/purchases-product-search-input.args';
import { PurchasesProductService } from './purchases-product.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

import { AdminUserType } from 'src/admin/dto/types';
import { PermissionsEnum } from 'src/admin/enums/permissions.enum';

@Resolver()
export class PurchasesProductResolver {

  private readonly logger = new Logger(PurchasesProductResolver.name);

  constructor(
    private readonly purchasesProductService: PurchasesProductService,
  ) {}

  @Query(() => PurchasesProductResponseType, { name: 'purchasesProductSearchByValues', description: 'Search all' })
  @UseGuards( JwtAuthGuard )
  searchByValues(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: PurchasesProductSearchInputArgs
  ): Promise<PurchasesProductResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> searchByValues: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.purchasesProductService.searchByValues(companyId, paginationArgs, inputArgs)
    .then( (response: PurchasesProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< searchByValues: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new PurchasesProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}