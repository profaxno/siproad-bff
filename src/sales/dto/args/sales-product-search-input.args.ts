import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

@ArgsType()
export class SalesProductSearchInputArgs{
    @IsOptional()
    @IsArray()
    @Field( () => [String], { nullable: true } )
    nameCodeList?: string[];

    @IsOptional()
    @IsBoolean()
    @Field( () => Boolean, { nullable: true } )
    enable4Sale?: boolean;

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    productCategoryId?: string;
}