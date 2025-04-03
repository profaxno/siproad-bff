import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SalesOrderType {

  @Field( () => String )
  id: string;

  @Field( () => String )
  code: string;

  @Field( () => String )
  companyId: string;

  @Field( () => String )
  userId: string;

  @Field( () => String, { nullable: true } )
  customerIdDoc?: string;

  @Field( () => String, { nullable: true } )
  customerName?: string;

  @Field( () => String, { nullable: true } )
  customerEmail?: string;

  @Field( () => String, { nullable: true } )
  customerPhone?: string;

  @Field( () => String, { nullable: true } )
  customerAddress?: string;

  @Field( () => String, { nullable: true } )
  comment?: string;
 
  @Field( () => Number )
  price: number;

  @Field( () => Number )
  cost: number;
  
  @Field( () => Number, { nullable: true } )
  discount?: number;
  
  @Field( () => Number, { nullable: true } )
  discountPct?: number;
  
  @Field( () => String )
  createdAt: string;

  @Field( () => Number )
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

  @Field( () => String, { nullable: true})
  code: string;

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
