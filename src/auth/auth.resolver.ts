import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException, HttpStatus, Logger, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorators';

import { LoginInput, ResetPasswordInput } from './dto/inputs';
import { AuthResponseType } from './dto/types/auth-response.type';
import { AuthService } from './auth.service';

import { PermissionsEnum } from 'src/admin/enums/permissions.enum';
import { AdminUserType } from 'src/admin/dto/types';

@Resolver()
export class AuthResolver {

  private readonly logger = new Logger(AuthResolver.name);
  
  constructor(
    private readonly authService: AuthService
  ) {}

  // @Mutation( () => AuthResponseType, { name: 'authLogin' } )
  // login(
  //   @Args('loginInput') loginInput: LoginInput
  // ): Promise<AuthResponseType> {
    
  //   this.logger.log(`>>> login: email=${loginInput.email}`);
  //   const start = performance.now();

  //   return this.authService.login(loginInput)
  //   .then( (response: AuthResponseType) => {
  //     const end = performance.now();
  //     this.logger.log(`<<< login: executed, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
  //     return response;
  //   })
  //   .catch((error) => {
  //     if(error instanceof BadRequestException)
  //       return new AuthResponseType(HttpStatus.BAD_REQUEST, error.message);

  //     this.logger.error(error.stack);
  //     return new AuthResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  //   })

  // }

  @Query( () => AuthResponseType, { name: 'authRevalidateToken' })
  @UseGuards( JwtAuthGuard )
  revalidateToken(
    @CurrentUser([PermissionsEnum.ADMIN_AUTH_LOGIN]) userDto: AdminUserType
  ): Promise<AuthResponseType> {

    this.logger.log(`>>> revalidateToken: user=${JSON.stringify(userDto)}`);
    const start = performance.now();

    return this.authService.revalidateToken(userDto)
    .then( (response: AuthResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< revalidateToken: executed, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new AuthResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })

  }

  // @Mutation( () => AuthResponseType, { name: 'authResetPassword' })
  // resetPassword(
  //   @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput
  // ): Promise<AuthResponseType> {
    
  //   this.logger.log(`>>> resetPassword: email=${resetPasswordInput.email}`);
  //   const start = performance.now();

  //   return this.authService.resetPassword(resetPasswordInput)
  //   .then( (response: AuthResponseType) => {
  //     const end = performance.now();
  //     this.logger.log(`<<< resetPassword: executed, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
  //     return response;
  //   })
  //   .catch( (error) => {
  //     if(error instanceof BadRequestException)
  //       return new AuthResponseType(HttpStatus.BAD_REQUEST, error.message);

  //     this.logger.error(error.stack);
  //     return new AuthResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  //   })

  // }

}
