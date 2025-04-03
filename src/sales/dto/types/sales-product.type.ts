import { Field, ObjectType } from "@nestjs/graphql";
import { BaseSalesProductDto } from "../sales-product.dto";

@ObjectType()
export class SalesProductType extends BaseSalesProductDto {}