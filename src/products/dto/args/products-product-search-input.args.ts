import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

@ArgsType()
export class ProductsProductSearchInputArgs{
    
    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    nameCode?: string;

    @IsOptional()
    @IsArray()
    @Field( () => [Number], { nullable: true } )
    productTypeList?: number[];

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    productCategoryId?: string;

    @IsOptional()
    @IsBoolean()
    @Field( () => Boolean, { nullable: true } )
    enable4Sale?: boolean;
}