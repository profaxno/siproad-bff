import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";

@ArgsType()
export class ProductsMovementSearchInputArgs{
    
    @IsString()
    @Field( () => String )
    productId: string;

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    createdAtInit?: string;

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    createdAtEnd?: string;
    
    @IsOptional()
    @IsArray()
    @Field( () => [Number], { nullable: true } )
    movementTypeList?: number[];

    @IsOptional()
    @IsArray()
    @Field( () => [Number], { nullable: true } )
    movementReasonList?: number[];

}