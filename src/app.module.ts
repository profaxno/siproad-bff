import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { config } from './config/app.config';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { SalesModule } from './sales/sales.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false, // TODO: set to false in production or when plugin apollo is enabled
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    AdminModule,
    AuthModule,
    ProductsModule,
    SalesModule,
    ExpensesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
