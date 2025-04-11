import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";

@ArgsType()
export class ProductsProductSearchInputArgs{
    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    nameCode?: string;

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    productTypeId?: string;
}