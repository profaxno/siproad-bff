import { IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class AdminCompanyType {
  
  @Field( () => String )
  id?: string;
  
  @MaxLength(45)
  @Field( () => String )
  name: string;
}

@ObjectType()
export class AdminCompanyResponseType extends ResponseType {

  @Field( () => [AdminCompanyType], {nullable: true})
  payload?: AdminCompanyType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: AdminCompanyType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  }
}