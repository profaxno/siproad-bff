import { IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PurchasesOrderInput {

  @IsOptional()
  @IsUUID()
  @Field( () => String, { nullable: true } )
  id?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Field( () => Number, { nullable: true } )
  code?: number;

  companyId?: string;

  userId?: string;

  @IsUUID()
  @Field( () => String)
  purchaseTypeId?: string;

  @IsOptional()
  @IsUUID()
  @Field( () => String, { nullable: true })
  documentTypeId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  providerIdDoc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  providerName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  providerEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  providerPhone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  @Field( () => String, { nullable: true } )
  providerAddress?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Field( () => String, { nullable: true } )
  comment?: string;
  
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Field( () => Number, { nullable: true } )
  amount?: number;
  
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  documentNumber?: string;
  
  @IsOptional()
  @IsInt()
  @Min(0)
  @Field( () => Number, { nullable: true } )
  status?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchasesOrderProductInput)
  @Field( () => [PurchasesOrderProductInput], { nullable: true} )
  productList?: PurchasesOrderProductInput[];

}

@InputType()
export class PurchasesOrderProductInput {
  @IsUUID()
  @Field( () => String)
  id: string;

  @IsNumber()
  @IsPositive()
  @Field( () => Number )
  qty: number;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  @Field( () => String, { nullable: true} )
  comment?: string;

  @IsString()
  @MaxLength(100)
  @Field( () => String )
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true} )
  code?: string;

  @IsNumber()
  @Min(0)
  @Field( () => Number )
  cost: number;

  @IsNumber()
  @Min(0)
  @Field( () => Number )
  amount: number;

  @IsBoolean()
  @Field( () => Boolean )
  updateProductCost: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Field( () => Number, { nullable: true} )
  status?: number;
  
}
