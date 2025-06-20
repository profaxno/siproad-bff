import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PurchasesTypeType {

  @Field( () => String )
  id: string;

  @Field( () => String )
  companyId: string;

  @Field( () => String )
  name: string;

}