import { Module } from '@nestjs/common';
import { SalesOrderResolver } from './sales-order.resolver';
import { SalesOrderService } from './sales-order.service';
import { PfxHttpModule } from 'profaxnojs/axios/pfx-http.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule, PfxHttpModule],
  providers: [SalesOrderResolver, SalesOrderService],
})
export class SalesModule {}
