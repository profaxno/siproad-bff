import { Field, ObjectType } from "@nestjs/graphql";
import { ProductsFormulaType } from "./products-formula.type";
import { ResponseType } from "src/common/dto/types/response.type";

// * formulas
@ObjectType()
export class ProductsFormulaResponseType extends ResponseType{
  @Field( () => [ProductsFormulaType], {nullable: true})
  payload?: ProductsFormulaType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsFormulaType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}