import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";

@ArgsType()
export class ProductsElementSearchInputArgs{
    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    name?: string;

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    elementTypeId?: string;
}