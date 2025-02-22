import { Field, ObjectType } from "@nestjs/graphql";
import { ProductsResponseBaseDto } from "../products-response-dto";
import { ProductsProductType } from "./products-product.type";

@ObjectType()
export class ProductsProductResponseType extends ProductsResponseBaseDto{
  @Field( () => [ProductsProductType], {nullable: true})
  payload?: ProductsProductType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsProductType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}