import { Field, ObjectType } from "@nestjs/graphql";
import { ProductsResponseBaseDto } from "../products-response-dto";
import { ProductsElementType } from "./products-element.type";

@ObjectType()
export class ProductsElementResponseType extends ProductsResponseBaseDto{

  @Field( () => [ProductsElementType], {nullable: true})
  payload?: ProductsElementType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsElementType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  }
}