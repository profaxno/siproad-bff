import { InputType } from "@nestjs/graphql";
import { BaseAdminDocumentTypeDto } from "../admin-document-type.dto";

@InputType()
export class AdminDocumentTypeInput extends BaseAdminDocumentTypeDto {

}