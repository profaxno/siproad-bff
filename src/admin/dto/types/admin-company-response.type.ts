import { Field, ObjectType } from "@nestjs/graphql";
import { AdminResponseBaseDto } from "../admin-response-dto";
import { AdminCompanyType } from "./admin-company.type";

@ObjectType()
export class AdminCompanyResponseType extends AdminResponseBaseDto{

  @Field( () => [AdminCompanyType], {nullable: true})
  payload?: AdminCompanyType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: AdminCompanyType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  }
}