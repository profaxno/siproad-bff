import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from 'src/common/common.module';

import { ProductsElementResolver } from './products-element.resolver';
import { ProductsElementService } from './products-element.service';

import { ProductsFormulaResolver } from './products-formula.resolver';
import { ProductsFormulaService } from './products-formula.service';

import { ProductsProductResolver } from './products-product.resolver';
import { ProductsProductService } from './products-product.service';

@Module({
  imports: [ConfigModule, CommonModule],
  providers: [ProductsElementResolver, ProductsElementService, ProductsFormulaResolver, ProductsFormulaService, ProductsProductResolver, ProductsProductService]
})
export class ProductsModule {}
