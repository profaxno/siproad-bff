import { Field, ObjectType } from "@nestjs/graphql";
import { BaseSalesProductDto } from "../sales-product.dto";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class SalesProductType extends BaseSalesProductDto {}


@ObjectType()
export class SalesProductResponseType extends ResponseType {
  @Field( () => [SalesProductType], {nullable: true})
  payload?: SalesProductType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: SalesProductType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}