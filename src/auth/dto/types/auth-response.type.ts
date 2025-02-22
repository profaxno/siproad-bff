import { Field, ObjectType } from "@nestjs/graphql";
import { AdminUserType } from "src/admin/dto/types/admin-user.type";

@ObjectType()
export class AuthDataResponseType {

  @Field( () => String )
  token: string;

  @Field( () => AdminUserType )
  user: AdminUserType;

  constructor(token: string, user: AdminUserType){
    this.token = token;
    this.user = user;
  }
}

@ObjectType()
export class AuthResponseType {

  @Field( () => Number )
  internalCode: number;

  @Field( () => String )
  message: string;

  @Field( () => AuthDataResponseType, { nullable: true } )
  payload?: AuthDataResponseType;

  constructor(internalCode: number, message: string, payload?: AuthDataResponseType){
    this.internalCode = internalCode;
    this.message = message;
    this.payload = payload;
  }

}