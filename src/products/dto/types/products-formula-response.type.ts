import { Field, ObjectType } from "@nestjs/graphql";
import { ProductsResponseBaseDto } from "../products-response-dto";
import { ProductsFormulaType } from "./products-formula.type";

// * formulas
@ObjectType()
export class ProductsFormulaResponseType extends ProductsResponseBaseDto{
  @Field( () => [ProductsFormulaType], {nullable: true})
  payload?: ProductsFormulaType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsFormulaType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}