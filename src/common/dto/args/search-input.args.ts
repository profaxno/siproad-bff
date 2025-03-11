import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";

@ArgsType()
export class SearchInputArgs{
    @IsOptional()
    @IsArray()
    @Field( () => [String], { nullable: true } )
    searchList?: string[];
}