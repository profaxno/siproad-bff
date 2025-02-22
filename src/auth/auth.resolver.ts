import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException, HttpStatus, Logger, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResponseType } from './dto/types/auth-response.type';
import { SignupInput, LoginInput } from './dto/inputs';
import { AdminUserType } from 'src/admin/dto/types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorators';
import { Roles } from '../admin/enums/roles.enums';

@Resolver()
export class AuthResolver {

  private readonly logger = new Logger(AuthResolver.name);
  
  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation( () => AuthResponseType, { name: 'signup' })
  signup( @Args('signupInput') signupInput: SignupInput): Promise<AuthResponseType> {
    
    this.logger.log(`>>> signup: signupInput=${JSON.stringify(signupInput)}`);
    const start = performance.now();

    return this.authService.signup(signupInput)
    .then( (response: AuthResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< signup: executed, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch( (error) => {
      this.logger.error(error.stack);
      return new AuthResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })

  }

  @Mutation( () => AuthResponseType, { name: 'login' } )
  login( @Args('loginInput') loginInput: LoginInput ): Promise<AuthResponseType> {
    
    this.logger.log(`>>> login: email=${loginInput.email}`);
    const start = performance.now();

    return this.authService.login(loginInput)
    .then( (response: AuthResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< login: executed, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      if(error instanceof BadRequestException)
        return new AuthResponseType(HttpStatus.BAD_REQUEST, error.message);

      this.logger.error(error.stack);
      return new AuthResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })

  }

  @Query( () => AuthResponseType, { name: 'revalidateToken' })
  @UseGuards( JwtAuthGuard )
  revalidateToken(@CurrentUser([Roles.user]) userDto: AdminUserType): Promise<AuthResponseType> {
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

}
