import { IsIn } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { MeasuresEnum } from "src/products/enums/measures.enum";
import { BaseProductsElementDto } from "../products-element.dto";

@ObjectType()
export class ProductsElementType extends BaseProductsElementDto {
  
  @Field( () => String )
  unit: MeasuresEnum;  
}