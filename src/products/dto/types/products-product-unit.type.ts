import { Field, ObjectType } from "@nestjs/graphql";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class ProductsProductUnitType {

  @Field( () => String )
  id: string;

  @Field( () => String )
  companyId: string;

  @Field( () => String )
  name: string;

}

@ObjectType()
export class ProductsProductUnitResponseType extends ResponseType{
  @Field( () => [ProductsProductUnitType], {nullable: true})
  payload?: ProductsProductUnitType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: ProductsProductUnitType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}