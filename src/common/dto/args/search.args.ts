import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";

@ArgsType()
export class SearchArgs{
    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    search?: string;

    @IsOptional()
    @IsArray()
    @Field( () => [String], { nullable: true } )
    searchList?: string[];
}