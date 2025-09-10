import { PfxHttpModule } from 'profaxnojs/axios';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductsProductResolver } from './products-product.resolver';
import { ProductsProductService } from './products-product.service';
import { ProductsProductUnitResolver } from './products-product-unit.resolver';
import { ProductsProductUnitService } from './products-product-unit.service';

@Module({
  imports: [ConfigModule, PfxHttpModule],
  providers: [ProductsProductResolver, ProductsProductService, ProductsProductUnitResolver, ProductsProductUnitService]
})
export class ProductsModule {}
