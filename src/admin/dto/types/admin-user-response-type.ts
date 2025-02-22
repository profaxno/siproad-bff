import { Field, ObjectType } from "@nestjs/graphql";
import { AdminUserType } from "./admin-user.type";
import { AdminResponseBaseDto } from "../admin-response-dto";

@ObjectType()
export class AdminUserResponseType extends AdminResponseBaseDto{

  @Field( () => [AdminUserType], {nullable: true})
  payload?: AdminUserType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: AdminUserType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  }
}