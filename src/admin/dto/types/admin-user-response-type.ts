import { Field, ObjectType } from "@nestjs/graphql";
import { AdminUserType } from "./admin-user.type";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class AdminUserResponseType extends ResponseType{

  @Field( () => [AdminUserType], {nullable: true})
  payload?: AdminUserType[];
}