import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";

@ArgsType()
export class PurchasesOrderSearchInputArgs{

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    createdAtInit?: string;

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    createdAtEnd?: string;

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    code?: string;

    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    providerNameIdDoc?: string;
    
    @IsOptional()
    @IsString()
    @Field( () => String, { nullable: true } )
    comment?: string;
}