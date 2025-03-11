import { Field, ObjectType } from "@nestjs/graphql";
import { ProductsElementType } from "./products-element.type";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class ProductsElementResponseType extends ResponseType{

  @Field( () => [ProductsElementType], {nullable: true})
  payload?: ProductsElementType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsElementType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  }
}