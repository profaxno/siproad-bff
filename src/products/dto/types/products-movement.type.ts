import { Field, ObjectType } from "@nestjs/graphql";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class ProductsMovementType {

  @Field( () => String )
  id?: string;

  @Field( () => Number )
  type: number;

  @Field( () => Number )
  reason: number;

  @Field( () => Number )
  qty: number;

  @Field( () => String )
  relatedId?: string;

  @Field( () => String )
  productId: string;

  @Field( () => String )
  userId: string;

}

@ObjectType()
export class ProductsMovementResponseType extends ResponseType{
  @Field( () => [ProductsMovementType], {nullable: true})
  payload?: ProductsMovementType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsMovementType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}
