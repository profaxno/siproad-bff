import { HttpStatus, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from 'src/common/dto/args';
import { AdminUserResponseType } from './dto/types/admin-user-response-type';
import { AdminUserService } from './admin-user.service';

@Resolver()
export class AdminUserResolver {

  private readonly logger = new Logger(AdminUserResolver.name);

  constructor(
    private readonly adminUserService: AdminUserService,
  ) {}

  // @Mutation(() => AdminUserResponseType, { name: 'updateUser', description: 'Create/Update user' })
  // update( @Args('user', { type: () => InputAdminUserDto }) user: InputAdminUserDto ): Promise<void | AdminUserResponseType> {
  //   this.logger.log(`>>> update: user=${JSON.stringify(user)}`);
  //   const start = performance.now();

  //   return this.adminUserService.update(user)
  //   .then( (response: AdminUserResponseType) => {
  //     const end = performance.now();
  //     this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
  //     return response;
  //   })
  //   .catch((error) => {
  //     this.logger.error(error.stack);
  //     return new AdminUserResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  //   })
  // }

  @Query(() => AdminUserResponseType, { name: 'findUsers', description: 'Find all' })
  find( @Args('userId', { type: () => String }) userId: string, @Args() paginationArgs: SearchPaginationArgs, @Args() inputArgs: SearchInputArgs ): Promise<void | AdminUserResponseType> {
    this.logger.log(`>>> find: userId=${userId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.adminUserService.find(userId, paginationArgs, inputArgs)
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
  findOneByValue( @Args('userId', { type: () => String }) userId: string, @Args('value', { type: () => String }) value: string ): Promise<void | AdminUserResponseType> {
    this.logger.log(`>>> findOneByValue: userId=${userId}, value=${value}`);
    const start = performance.now();

    return this.adminUserService.findOneByValue(userId, value)
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

  // TODO: falta validar que el id sea un uuid valido
  @Mutation(() => AdminUserResponseType, { name: 'blockUser', description: 'Block user' })
  block( @Args('id', { type: () => String }) id: string ): Promise<void | AdminUserResponseType> {
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