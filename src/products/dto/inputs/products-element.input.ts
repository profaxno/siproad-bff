import { IsIn } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { MeasuresEnum } from "src/products/enum/measures.enum";
import { BaseProductsElementDto } from "../products-element.dto";

@InputType()
export class ProductsElementInput extends BaseProductsElementDto {
  @IsIn([MeasuresEnum.UN, MeasuresEnum.KG])
  @Field( () => String )
  unit: string;
}