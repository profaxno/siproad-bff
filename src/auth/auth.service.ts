import { BadRequestException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { SignupInput } from './dto/inputs/signup.input';
import { AuthDataResponseType, AuthResponseType } from './dto/types/auth-response.type';
import { AdminUserService } from '../admin/admin-user.service';

import { LoginInput } from './dto/inputs';
import { AdminUserInput } from 'src/admin/dto/inputs/admin-user.input';
import { AdminUserType } from 'src/admin/dto/types/admin-user.type';
import { AdminUserResponseType } from 'src/admin/dto/types/admin-user-response-type';


@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly adminUserService: AdminUserService,
    private jwtService: JwtService
  ) {}

  signup(signupInput: SignupInput): Promise<AuthResponseType> {
    this.logger.log(`signup: ${JSON.stringify(signupInput)}`);
    
    // * map to input admin user dto
    const inputAdminUserDto = new AdminUserInput(signupInput.companyId, signupInput.fullName, signupInput.email, signupInput.password);

    // * create/update user
    return this.adminUserService.update(inputAdminUserDto)
    .then( (response: AdminUserResponseType) => {
      
      // * generate response
      let data = undefined;
      if(response.internalCode == HttpStatus.OK){
        const userDto: AdminUserType = response.payload[0]; // * get user
        const token = this.generateJwtToken(userDto); // * generate token
        data = new AuthDataResponseType(token, userDto);
      }

      // * response
      return new AuthResponseType(response.internalCode, response.message, data);
    })

  }

  login(loginInput: LoginInput): Promise<AuthResponseType> {
    this.logger.log(`login: email=${loginInput.email}`);
    
    const { email, password } = loginInput;

    // * create/update user
    return this.adminUserService.findOneByEmail(email)
    .then( (response: AdminUserResponseType) => {

      // * generate response
      let data = undefined;
      if(response.internalCode == HttpStatus.OK){
        
        // * get user
        const userDto: AdminUserType = response.payload[0];

        // * validate password
        if( !bcrypt.compareSync(password, userDto.password ) ) {
          throw new BadRequestException('invalid credentianls');  
        }
        
        // * generate token
        const token = this.generateJwtToken(userDto);

        data = new AuthDataResponseType(token, userDto);
      }

      // * response
      return new AuthResponseType(response.internalCode, response.message, data);
    })

  }

  revalidateToken(userDto: AdminUserType): Promise<AuthResponseType> {
    const token = this.generateJwtToken(userDto);

    const data = new AuthDataResponseType(token, userDto);

    return Promise.resolve(new AuthResponseType(HttpStatus.OK, 'executed', data));
  }

  validateUser(companyId: string, id: string): Promise<AdminUserType>{
    
    return this.adminUserService.findOneByValue(companyId, id)
    .then( (response: AdminUserResponseType) => {

      if(response.internalCode == HttpStatus.OK){
        
        const userDto: AdminUserType = response.payload[0];
        delete userDto.password;

        if(userDto.block)
          throw new UnauthorizedException(`inactive user, talk with an admin`);

        return userDto;
      }

      throw new UnauthorizedException(`user not authorized`);
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
