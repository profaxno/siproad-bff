import { PfxHttpModule } from 'profaxnojs/axios';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductsProductResolver } from './products-product.resolver';
import { ProductsProductService } from './products-product.service';

@Module({
  imports: [ConfigModule, PfxHttpModule],
  providers: [ProductsProductResolver, ProductsProductService]
})
export class ProductsModule {}
