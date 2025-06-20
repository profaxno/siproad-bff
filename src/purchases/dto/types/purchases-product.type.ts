import { Field, ObjectType } from "@nestjs/graphql";
import { BasePurchasesProductDto } from "../purchases-product.dto";

@ObjectType()
export class PurchasesProductType extends BasePurchasesProductDto {}