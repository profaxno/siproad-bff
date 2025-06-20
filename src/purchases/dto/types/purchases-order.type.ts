import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PurchasesOrderType {

  @Field( () => String )
  id: string;

  @Field( () => Number )
  code: number;

  @Field( () => String )
  companyId: string;

  @Field( () => String, { nullable: true } )
  userId: string;

  @Field( () => String)
  purchaseTypeId?: string;
  
 @Field( () => String, { nullable: true } )
  documentTypeId?: string;

  @Field( () => String, { nullable: true } )
  providerIdDoc?: string;

  @Field( () => String, { nullable: true } )
  providerName?: string;

  @Field( () => String, { nullable: true } )
  providerEmail?: string;

  @Field( () => String, { nullable: true } )
  providerPhone?: string;

  @Field( () => String, { nullable: true } )
  providerAddress?: string;

  @Field( () => String, { nullable: true } )
  comment?: string;
 
  @Field( () => Number )
  amount: number;

  @Field( () => String, { nullable: true } )
  documentNumber?: string;
  
  @Field( () => String )
  createdAt: string;

  @Field( () => Number )
  status?: number;

  @Field( () => [PurchasesOrderProductType], { nullable: true} )
  productList?: PurchasesOrderProductType[];

}

@ObjectType()
export class PurchasesOrderProductType {
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
  amount: number;

  @Field( () => Number, { nullable: true} )
  status?: number;
  
}
