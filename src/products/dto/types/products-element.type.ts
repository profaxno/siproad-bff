import { IsIn } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { MeasuresEnum } from "src/products/enum/measures.enum";
import { BaseProductsElementDto } from "../products-element.dto";

@ObjectType()
export class ProductsElementType extends BaseProductsElementDto {
  @IsIn([MeasuresEnum.UN, MeasuresEnum.KG])
  @Field( () => String )
  unit: string;  
}