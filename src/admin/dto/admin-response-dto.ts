import { Field, ObjectType } from "@nestjs/graphql";
import { AdminCompanyType, AdminUserType } from "./types";

@ObjectType()
export class AdminResponseBaseDto {

  @Field( () => Number )
  internalCode: number;

  @Field( () => String )
  message: string;

  @Field( () => Number, { nullable: true } )
  qty?: number;

  constructor(internalCode: number, message: string, qty?: number){
    this.internalCode = internalCode;
    this.message = message;
    this.qty = qty;
  }
}