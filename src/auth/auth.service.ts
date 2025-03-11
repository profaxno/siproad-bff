import { BadRequestException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';

import { LoginInput, ResetPasswordInput } from './dto/inputs';
import { AuthDataResponseType, AuthResponseType } from './dto/types/auth-response.type';
import { AdminUserService } from '../admin/admin-user.service';

import { UserStatusEnum } from 'src/admin/enums/user-status.enum';
import { AdminUserType, AdminUserResponseType } from 'src/admin/dto/types';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly adminUserService: AdminUserService,
    private jwtService: JwtService
  ) {}

  login(loginInput: LoginInput): Promise<AuthResponseType> {
    this.logger.log(`login: email=${loginInput.email}`);
    
    const { email, password } = loginInput;

    // * create/update user
    return this.adminUserService.findOneByEmail(email)
    .then( (response: AdminUserResponseType) => {

      // * generate response
      if(response.internalCode == HttpStatus.OK){
        
        // * get user
        const userDto: AdminUserType = response.payload[0];

        // * validate password
        if( !bcrypt.compareSync(password, userDto.password ) ) {
          this.logger.warn(`login: wrong password, email=${email}`);
          throw new BadRequestException('invalid credentianls');  
        }
        
        // * generate token
        const token = this.generateJwtToken(userDto);

        const data = new AuthDataResponseType(token, userDto);
        return new AuthResponseType(response.internalCode, response.message, data);
      }
      
      this.logger.warn(`login: user not found, response=${response.message}, email=${email}`);
      throw new BadRequestException('invalid credentianls');  
    })

  }

  revalidateToken(userDto: AdminUserType): Promise<AuthResponseType> {
    const token = this.generateJwtToken(userDto);

    const data = new AuthDataResponseType(token, userDto);

    return Promise.resolve(new AuthResponseType(HttpStatus.OK, 'executed', data));
  }

  validateUser(id: string): Promise<AdminUserType>{
    
    return this.adminUserService.findById(id)
    .then( (response: AdminUserResponseType) => {

      if(response.internalCode == HttpStatus.OK){
        
        // * get user
        const userDto: AdminUserType = response.payload[0];

        // * validate status
        if(userDto.status == UserStatusEnum.BLOCKED){
          this.logger.warn(`validateUser: blocked user, id=${id}`);
          throw new UnauthorizedException(`inactive user, talk with an admin`);
        }

        delete userDto.password;
        return userDto;
      }

      this.logger.error(`validateUser: user not found, response=${response.message}, id=${id}`);
      throw new UnauthorizedException('user not authorized');
    })

  }

  resetPassword(resetPasswordInput: ResetPasswordInput): Promise<AuthResponseType> {
    const email = resetPasswordInput.email;
    this.logger.log(`resetPassword: email=${email}`);
    
    // * create/update user
    return this.adminUserService.findOneByEmail(email)
    .then( (response: AdminUserResponseType) => {

      if(response.internalCode == HttpStatus.OK){

        // * get user
        const userDto: AdminUserType = response.payload[0];
        
        // * update user
        userDto.password = resetPasswordInput.password;

        return this.adminUserService.update(userDto)
        .then( () => new AuthResponseType(response.internalCode, response.message) )
      }

      this.logger.warn(`resetPassword: user not found, response=${response.message}, email=${email}`);
      throw new BadRequestException('user not found')
    })

  }

  private generateJwtToken(userDto: AdminUserType): string {
    const token: string = this.jwtService.sign({
      companyId: userDto.companyId,
      id: userDto.id
    });

    return token;
  }
}
