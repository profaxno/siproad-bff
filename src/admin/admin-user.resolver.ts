import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { AdminUserInput } from './dto/inputs/admin-user.input';
import { AdminUserType, AdminUserResponseType } from './dto/types';
import { PermissionsEnum } from './enums/permissions.enum';
import { AdminUserService } from './admin-user.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';

@Resolver()
export class AdminUserResolver {

  private readonly logger = new Logger(AdminUserResolver.name);

  constructor(
    private readonly adminUserService: AdminUserService,
  ) {}

  @Mutation(() => AdminUserResponseType, { name: 'adminUserUpdate', description: 'Create/update user' })
  @UseGuards( JwtAuthGuard )
  update(
    @CurrentUser([PermissionsEnum.SIPROAD_ADMIN, PermissionsEnum.ADMIN_USER_WRITE]) userDto: AdminUserType,
    @Args('user', { type: () => AdminUserInput }) user: AdminUserInput
  ): Promise<AdminUserResponseType> {

    this.logger.log(`>>> update: user=${JSON.stringify(user)}`);
    const start = performance.now();

    // * validate companyId if user is SIPROAD_ADMIN and companyId is not set
    const found = userDto.permissionList.find( (permission) => permission.code === PermissionsEnum.SIPROAD_ADMIN );
    if (found && !user.companyId) {
      return Promise.resolve(new AdminUserResponseType(HttpStatus.BAD_REQUEST, 'CompanyId is required'));
    }

    user.companyId = found ? user.companyId: userDto.companyId;

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

  @Query(() => AdminUserResponseType, { name: 'adminUserFind', description: 'Find all' })
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

  @Query(() => AdminUserResponseType, { name: 'adminUserFindOneById', description: 'Find one by id' })
  @UseGuards( JwtAuthGuard )
  findOneById(
    @CurrentUser([PermissionsEnum.ADMIN_USER_READ]) userDto: AdminUserType,
    @Args('value', { type: () => String }) value: string
  ): Promise<AdminUserResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> findOneById: companyId=${companyId}, id=${value}`);
    const start = performance.now();

    return this.adminUserService.findByValue(companyId, value)
    .then( (response: AdminUserResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< findOneById: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AdminUserResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }
  
  @Mutation(() => AdminUserResponseType, { name: 'adminUserBlock', description: 'Block user' })
  @UseGuards( JwtAuthGuard )
  block(
    @CurrentUser([PermissionsEnum.ADMIN_USER_WRITE]) userDto: AdminUserType,
    @Args('id', { type: () => String }, new ParseUUIDPipe()) id: string
  ): Promise<AdminUserResponseType> {

    this.logger.log(`>>> block: id=${id}`);
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