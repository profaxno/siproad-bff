import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";

@ArgsType()
export class SearchInputArgs{
    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    search?: string;

    @IsOptional()
    @IsArray()
    @Field( () => [String], { nullable: true } )
    searchList?: string[];
}