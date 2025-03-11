import { Field, ObjectType } from "@nestjs/graphql";
import { AdminCompanyType } from "./admin-company.type";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class AdminCompanyResponseType extends ResponseType{

  @Field( () => [AdminCompanyType], {nullable: true})
  payload?: AdminCompanyType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: AdminCompanyType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  }
}