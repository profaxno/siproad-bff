import { Field, ObjectType } from "@nestjs/graphql";
import { BaseProductsProductDto } from "../products-product.dto";
import { ResponseType } from "src/common/dto/types/response.type";
import { ProductsMovementType } from "./products-movement.type";

@ObjectType()
export class ProductsProductType extends BaseProductsProductDto {
  
  // @Field( () => String )
  // companyId: string;

  @Field( () => [ProductsProductElementType], {nullable: true})
  elementList?: ProductsProductElementType[];

  @Field( () => [ProductsMovementType], {nullable: true})
  movementList?: ProductsMovementType[];

}

@ObjectType()
export class ProductsProductElementType {
  
  @Field( () => ProductsProductType)
  element: ProductsProductType;

  @Field( () => Number )
  qty: number;

}

@ObjectType()
export class ProductsProductResponseType extends ResponseType {
  @Field( () => [ProductsProductType], {nullable: true})
  payload?: ProductsProductType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsProductType[]) {
    super(internalCode, message, qty);
    this.payload = payload;
  }
}