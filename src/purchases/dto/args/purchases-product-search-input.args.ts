import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

@ArgsType()
export class PurchasesProductSearchInputArgs{
    @IsOptional()
    @IsArray()
    @Field( () => [String], { nullable: true } )
    nameCodeList?: string[];

    @IsOptional()
    @IsArray()
    @Field( () => [Number], { nullable: true } )
    productTypeList?: number[];

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    productCategoryId?: string;
}