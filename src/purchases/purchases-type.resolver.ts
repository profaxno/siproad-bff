import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { SearchPaginationArgs } from '../common/dto/args';

import { PurchasesTypeSearchInputArgs } from './dto/args/purchases-type-search-input.args';
import { PurchasesTypeResponseType } from './dto/types/purchases-type.type';
import { PurchasesTypeService } from './purchases-type.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

import { AdminUserType } from 'src/admin/dto/types/admin-user.type';
import { PermissionsEnum } from 'src/admin/enums/permissions.enum';

@Resolver()
export class PurchasesTypeResolver {

  private readonly logger = new Logger(PurchasesTypeResolver.name);

  constructor(
    private readonly purchasesTypeService: PurchasesTypeService,
  ) {}

  @Query(() => PurchasesTypeResponseType, { name: 'purchasesTypeSearchByValues', description: 'Search all' })
  @UseGuards( JwtAuthGuard )
  searchByValues(
    @CurrentUser([PermissionsEnum.PRODUCTS_PRODUCT_READ]) userDto: AdminUserType,
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: PurchasesTypeSearchInputArgs
  ): Promise<PurchasesTypeResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> searchByValues: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.purchasesTypeService.searchByValues(companyId, paginationArgs, inputArgs)
    .then( (response: PurchasesTypeResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< searchByValues: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new PurchasesTypeResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}