import { Field, ObjectType, Query } from '@nestjs/graphql';

@ObjectType()
export class ResponseType {

  @Field( () => Number)
  internalCode: number;
  
  @Field( () => String)
  message: string;

  @Field( () => Number)
  qty?: number;

  constructor(internalCode: number, message: string, qty?: number){
    this.internalCode = internalCode;
    this.message = message;
    this.qty = qty;
  }
}

