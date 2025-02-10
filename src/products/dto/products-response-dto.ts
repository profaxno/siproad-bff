import { Field, ObjectType } from "@nestjs/graphql";

import { ProductsElementDto } from "./products-element.dto";
import { ProductsFormulaDto } from "./products-formula.dto";
import { ProductsProductDto } from "./products-product.dto";

@ObjectType()
export class ProductsResponseBaseDto {

  @Field( () => Number )
  internalCode: number;

  @Field( () => String )
  message: string;

  @Field( () => Number, { nullable: true } )
  qty?: number;

  constructor(internalCode: number, message: string, qty?: number){
    this.internalCode = internalCode;
    this.message = message;
    this.qty = qty;
  }
}

// * elements
@ObjectType()
export class ProductsElementResponseDto extends ProductsResponseBaseDto{

  @Field( () => [ProductsElementDto], {nullable: true})
  payload?: ProductsElementDto[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsElementDto[]){
    super(internalCode, message, qty);
    this.payload = payload;
  }
}

// * formulas
@ObjectType()
export class ProductsFormulaResponseDto extends ProductsResponseBaseDto{
  @Field( () => [ProductsFormulaDto], {nullable: true})
  payload?: ProductsFormulaDto[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsFormulaDto[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}

// * products
@ObjectType()
export class ProductsProductResponseDto extends ProductsResponseBaseDto{
  @Field( () => [ProductsProductDto], {nullable: true})
  payload?: ProductsProductDto[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsProductDto[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}