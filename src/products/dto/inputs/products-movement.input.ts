import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsUUID } from "class-validator";

@InputType()
export class ProductsMovementInput {

  @IsOptional()
  @IsUUID()
  @Field( () => String )
  id?: string;

  // @IsIn([MovementTypeEnum.OUT, MovementTypeEnum.IN])
  @IsNumber()
  @Field( () => Number )
  type: number;

  // @IsIn([MovementReasonEnum.SALE, MovementReasonEnum.PURCHASE, MovementReasonEnum.ADJUSTMENT])
  @IsNumber()
  @Field( () => Number )
  reason: number;

  @IsNumber()
  @Field( () => Number )
  qty: number;

  @IsOptional()
  @IsUUID()
  @Field( () => String )
  relatedId?: string;

  @IsUUID()
  @Field( () => String )
  productId: string;

  @IsUUID()
  @Field( () => String )
  userId: string;

}
