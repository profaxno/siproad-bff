import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";

@ArgsType()
export class ProductsProductUnitSearchInputArgs{

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    name?: string;
}