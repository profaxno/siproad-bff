import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SalesOrderType {

  @Field( () => String )
  id: string;

  @Field( () => String )
  companyId: string;

  @Field( () => String )
  userId: string;

  @Field( () => String, { nullable: true } )
  comment?: string;
  
  @Field( () => Number )
  cost: number;
  
  @Field( () => Number, { nullable: true } )
  discount?: number;
  
  @Field( () => Number, { nullable: true } )
  discountPct?: number;
  
  @Field( () => Number, { nullable: true } )
  status?: number;

  @Field( () => [SalesOrderProductType], { nullable: true} )
  productList?: SalesOrderProductType[];

}

@ObjectType()
export class SalesOrderProductType {
  @Field( () => String)
  id: string;

  @Field( () => Number )
  qty: number;

  @Field( () => String, { nullable: true} )
  comment?: string;

  @Field( () => String)
  name: string;

  @Field( () => Number )
  cost: number;

  @Field( () => Number )
  price: number;
  
  @Field( () => Number, { nullable: true} )
  discount?: number;

  @Field( () => Number, { nullable: true} )
  discountPct?: number;

  @Field( () => Number, { nullable: true} )
  status?: number;
  
}
