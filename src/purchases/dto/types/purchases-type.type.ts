import { Field, ObjectType } from "@nestjs/graphql";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class PurchasesTypeType {

  @Field( () => String )
  id: string;

  @Field( () => String )
  companyId: string;

  @Field( () => String )
  name: string;

}

@ObjectType()
export class PurchasesTypeResponseType extends ResponseType {
  @Field( () => [PurchasesTypeType], {nullable: true})
  payload?: PurchasesTypeType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: PurchasesTypeType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}