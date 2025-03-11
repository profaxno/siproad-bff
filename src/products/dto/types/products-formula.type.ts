import { Field, ObjectType } from "@nestjs/graphql";
import { BaseProductsFormulaDto } from "../products-formula.dto";

@ObjectType()
export class ProductsFormulaType extends BaseProductsFormulaDto {
  @Field( () => [ProductsFormulaElementType], {nullable: true})
  elementList?: ProductsFormulaElementType[];
}

@ObjectType()
export class ProductsFormulaElementType {
  @Field( () => String)
  id: string;

  @Field( () => Number )
  qty: number;

  @Field( () => String )
  name?: string;

  @Field( () => Number )
  cost?: number;

  @Field( () => String )
  unit?: string;
}