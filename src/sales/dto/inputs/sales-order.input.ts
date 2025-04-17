import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SalesOrderInput {

  @IsUUID()
  @IsOptional()
  @Field( () => String, { nullable: true } )
  id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  code?: string;

  companyId?: string;

  userId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  customerIdDoc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  customerName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  customerEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  customerPhone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  @Field( () => String, { nullable: true } )
  customerAddress?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Field( () => String, { nullable: true } )
  comment?: string;
  
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Field( () => Number, { nullable: true } )
  discount?: number;
  
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Field( () => Number, { nullable: true } )
  discountPct?: number;
  
  @IsOptional()
  @IsInt()
  @Min(0)
  @Field( () => Number, { nullable: true } )
  status?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalesOrderProductInput)
  @Field( () => [SalesOrderProductInput], { nullable: true} )
  productList?: SalesOrderProductInput[];

}

@InputType()
export class SalesOrderProductInput {
  @IsUUID()
  @Field( () => String)
  id: string;

  @IsNumber()
  @IsPositive()
  @Field( () => Number )
  qty: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
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
  price: number;
  
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Field( () => Number, { nullable: true} )
  discount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Field( () => Number, { nullable: true} )
  discountPct?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Field( () => Number, { nullable: true} )
  status?: number;
  
}
