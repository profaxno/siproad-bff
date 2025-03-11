import { Module } from '@nestjs/common';
import { SalesOrderResolver } from './sales-order.resolver';
import { SalesOrderService } from './sales-order.service';
import { PfxHttpModule } from 'profaxnojs/axios/pfx-http.module';
import { ConfigModule } from '@nestjs/config';
import { SalesProductResolver } from './sales-product.resolver';
import { SalesProductService } from './sales-product.service';


@Module({
  imports: [ConfigModule, PfxHttpModule],
  providers: [SalesProductResolver, SalesProductService, SalesOrderResolver, SalesOrderService],
})
export class SalesModule {}
