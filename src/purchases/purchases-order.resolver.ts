import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchPaginationArgs } from '../common/dto/args';

import { PurchasesOrderInput } from './dto/inputs/purchases-order.input';
import { PurchasesOrderSearchInputArgs } from './dto/args/purchases-order-search-input.args';
import { PurchasesOrderResponseType } from './dto/types/purchases-order-response.type';
import { PurchasesOrderService } from './purchases-order.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

import { AdminUserType } from 'src/admin/dto/types';
import { PermissionsEnum } from 'src/admin/enums/permissions.enum';


@Resolver()
export class PurchasesOrderResolver {

  private readonly logger = new Logger(PurchasesOrderResolver.name);

  constructor(
    private readonly purchasesOrderService: PurchasesOrderService,
  ) {}

  @Mutation(() => PurchasesOrderResponseType, { name: 'purchasesOrderUpdate', description: 'Create/update order' })
  @UseGuards( JwtAuthGuard )
  update(
    @CurrentUser([PermissionsEnum.PURCHASES_ORDER_WRITE]) userDto: AdminUserType,
    @Args('order', { type: () => PurchasesOrderInput }) order: PurchasesOrderInput
  ): Promise<PurchasesOrderResponseType> {

    order.companyId = userDto.companyId;
    order.userId = userDto.id;

    this.logger.log(`>>> update: order=${JSON.stringify(order)}`);
    const start = performance.now();

    return this.purchasesOrderService.update(order)
    .then( (response: PurchasesOrderResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new PurchasesOrderResponseType(HttpStatus.INTERNAL_SERVER_ERROR, `${error.code} - ${error.message}`);
    })
  }

  @Query(() => PurchasesOrderResponseType, { name: 'purchasesOrderSearchByValues', description: 'Search all' })
  @UseGuards( JwtAuthGuard )
  searchByValues(
    @CurrentUser([PermissionsEnum.PURCHASES_ORDER_READ]) userDto: AdminUserType, 
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: PurchasesOrderSearchInputArgs
  ): Promise<PurchasesOrderResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> searchByValues: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.purchasesOrderService.searchByValues(companyId, paginationArgs, inputArgs)
    .then( (response: PurchasesOrderResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< searchByValues: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new PurchasesOrderResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}