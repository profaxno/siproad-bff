import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { SalesOrderInput } from './dto/inputs/sales-order.input';
import { SalesOrderResponseType } from './dto/types/sales-order-response.type';
import { SalesOrderService } from './sales-order.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

import { AdminUserType } from 'src/admin/dto/types';
import { PermissionsEnum } from 'src/admin/enums/permissions.enum';

@Resolver()
export class SalesOrderResolver {

  private readonly logger = new Logger(SalesOrderResolver.name);

  constructor(
    private readonly salesOrderService: SalesOrderService,
  ) {}

  @Mutation(() => SalesOrderResponseType, { name: 'salesOrderUpdate', description: 'Create/update order' })
  @UseGuards( JwtAuthGuard )
  update(
    @CurrentUser([PermissionsEnum.SALES_ORDER_WRITE]) userDto: AdminUserType,
    @Args('order', { type: () => SalesOrderInput }) order: SalesOrderInput
  ): Promise<SalesOrderResponseType> {

    order.companyId = userDto.companyId;
    order.userId = userDto.id;

    this.logger.log(`>>> update: order=${JSON.stringify(order)}`);
    const start = performance.now();

    return this.salesOrderService.update(order)
    .then( (response: SalesOrderResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new SalesOrderResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => SalesOrderResponseType, { name: 'salesOrderFind', description: 'Find all' })
  @UseGuards( JwtAuthGuard )
  find(
    @CurrentUser([PermissionsEnum.SALES_ORDER_READ]) userDto: AdminUserType, 
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: SearchInputArgs
  ): Promise<SalesOrderResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> find: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.salesOrderService.find(companyId, paginationArgs, inputArgs)
    .then( (response: SalesOrderResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< find: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new SalesOrderResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => SalesOrderResponseType, { name: 'salesOrderFindOneById', description: 'Find one by id' })
  @UseGuards( JwtAuthGuard )
  findOneById(
    @CurrentUser([PermissionsEnum.SALES_ORDER_READ]) userDto: AdminUserType, 
    @Args('value', { type: () => String }) value: string
  ): Promise<SalesOrderResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> FindOneById: companyId=${companyId}, value=${value}`);
    const start = performance.now();

    return this.salesOrderService.findByValue(companyId, value)
    .then( (response: SalesOrderResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< FindOneById: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new SalesOrderResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Mutation(() => SalesOrderResponseType, { name: 'salesOrderDelete', description: 'Delete order' })
  @UseGuards( JwtAuthGuard )
  delete(
    @CurrentUser([PermissionsEnum.SALES_ORDER_WRITE]) userDto: AdminUserType, 
    @Args('id', { type: () => String }, new ParseUUIDPipe()) id: string
  ): Promise<SalesOrderResponseType> {

    this.logger.log(`>>> delete: id=${id}`);
    const start = performance.now();

    return this.salesOrderService.delete(id)
    .then( (response: SalesOrderResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< delete: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new SalesOrderResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}