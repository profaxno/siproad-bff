import { Field, ObjectType } from "@nestjs/graphql";
import { BaseAdminDocumentTypeDto } from "../admin-document-type.dto";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class AdminDocumentTypeType extends BaseAdminDocumentTypeDto {

}

@ObjectType()
export class AdminDocumentTypeResponseType extends ResponseType {

  @Field( () => [AdminDocumentTypeType], {nullable: true})
  payload?: AdminDocumentTypeType[];
  
}