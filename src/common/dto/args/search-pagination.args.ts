import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

@ArgsType()
export class SearchPaginationArgs{
    @IsOptional()
    @IsPositive()
    @Min(1)
    @Type(() => Number)
    @Field( () => Number, { nullable: true })
    page?: number;

    @IsOptional()
    @IsPositive()
    @Min(1)
    @Type(() => Number)
    @Field( () => Number, { nullable: true })
    limit?: number;
}