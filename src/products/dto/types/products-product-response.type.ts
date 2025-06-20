import { Field, ObjectType } from "@nestjs/graphql";
import { ProductsProductType } from "./products-product.type";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class ProductsProductResponseType extends ResponseType {
  @Field( () => [ProductsProductType], {nullable: true})
  payload?: ProductsProductType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsProductType[]) {
    super(internalCode, message, qty);
    this.payload = payload;
  }
}