import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductsResponseBaseDto {

  @Field( () => Number )
  internalCode: number;

  @Field( () => String )
  message: string;

  @Field( () => Number, { nullable: true } )
  qty?: number;

  constructor(internalCode: number, message: string, qty?: number){
    this.internalCode = internalCode;
    this.message = message;
    this.qty = qty;
  }

}