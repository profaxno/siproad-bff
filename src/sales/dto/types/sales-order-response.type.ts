import { Field, ObjectType } from "@nestjs/graphql";
import { SalesOrderType } from "./sales-order.type";
import { ResponseType } from "src/common/dto/types/response.type";

// * formulas
@ObjectType()
export class SalesOrderResponseType extends ResponseType{
  @Field( () => [SalesOrderType], {nullable: true})
  payload?: SalesOrderType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: SalesOrderType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}