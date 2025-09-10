import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { SearchPaginationArgs } from "src/common/dto/args";

@ArgsType()
export class ProductsProductSearchQueryArgs extends SearchPaginationArgs {
    
    @IsOptional()
    @IsBoolean()
    @Field( () => Boolean, { nullable: true } )
    withMovements?: boolean;

}