import { PfxHttpModule } from 'profaxnojs/axios';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { InventoryProductResolver } from './inventory-product.resolver';
import { InventoryProductService } from './inventory-product.service';

@Module({
  imports: [ConfigModule, PfxHttpModule],
  providers: [InventoryProductResolver, InventoryProductService]
})
export class InventoryModule {}
