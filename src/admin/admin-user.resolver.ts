import { HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from 'src/common/dto/args';
import { AdminUserResponseType } from './dto/types/admin-user-response-type';
import { AdminUserService } from './admin-user.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';
import { PermissionsEnum } from './enums/permissions.enum';
import { AdminUserType } from './dto/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminUserInput } from './dto/inputs/admin-user.input';

@Resolver()
export class AdminUserResolver {

  private readonly logger = new Logger(AdminUserResolver.name);

  constructor(
    private readonly adminUserService: AdminUserService,
  ) {}

  @Mutation(() => AdminUserResponseType, { name: 'updateUser', description: 'Create/Update user' })
  update( @Args('user', { type: () => AdminUserInput }) user: AdminUserInput ): Promise<AdminUserResponseType> {
    this.logger.log(`>>> update: user=${JSON.stringify(user)}`);
    const start = performance.now();

    return this.adminUserService.update(user)
    .then( (response: AdminUserResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminUserResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => AdminUserResponseType, { name: 'findUsers', description: 'Find all' })
  @UseGuards( JwtAuthGuard )
  find(
    @CurrentUser([PermissionsEnum.ADMIN_USER_READ]) userDto: AdminUserType,
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: SearchInputArgs
  ): Promise<AdminUserResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> find: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.adminUserService.find(companyId, paginationArgs, inputArgs)
    .then( (response: AdminUserResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< find: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminUserResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => AdminUserResponseType, { name: 'findOneUserByValue', description: 'Find user by value' })
  @UseGuards( JwtAuthGuard )
  findOneByValue(
    @CurrentUser([PermissionsEnum.ADMIN_USER_READ]) userDto: AdminUserType,
    @Args('value', { type: () => String }) value: string
  ): Promise<AdminUserResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> findOneByValue: companyId=${companyId}, value=${value}`);
    const start = performance.now();

    return this.adminUserService.findOneByValue(companyId, value)
    .then( (response: AdminUserResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< findOneByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminUserResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }
  
  @Mutation(() => AdminUserResponseType, { name: 'blockUser', description: 'Block user' })
  @UseGuards( JwtAuthGuard )
  block(
    @CurrentUser([PermissionsEnum.ADMIN_USER_WRITE]) userDto: AdminUserType,
    @Args('id', { type: () => String }) id: string
  ): Promise<AdminUserResponseType> {

    this.logger.log(`>>> block: id=${JSON.stringify(id)}`);
    const start = performance.now();

    return this.adminUserService.block(id)
    .then( (response: AdminUserResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< block: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminUserResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}