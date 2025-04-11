import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";

@ArgsType()
export class SalesProductSearchInputArgs{
    @IsOptional()
    @IsArray()
    @Field( () => [String], { nullable: true } )
    nameCodeList?: string[];

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    productTypeId?: string;
}