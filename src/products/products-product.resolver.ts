import { HttpStatus, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';

import { ProductsProductInput } from './dto/inputs/products-product.input';
import { ProductsProductResponseType } from './dto/types/products-product-response.type';
import { ProductsProductService } from './products-product.service';

@Resolver()
export class ProductsProductResolver {

  private readonly logger = new Logger(ProductsProductResolver.name);

  constructor(
    private readonly productsProductService: ProductsProductService,
  ) {}

  @Mutation(() => ProductsProductResponseType, { name: 'updateProduct', description: 'Create/Update product' })
  update( @Args('product', { type: () => ProductsProductInput }) product: ProductsProductInput ): Promise<void | ProductsProductResponseType> {
    this.logger.log(`>>> update: product=${JSON.stringify(product)}`);
    const start = performance.now();

    return this.productsProductService.update(product)
    .then( (response: ProductsProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsProductResponseType, { name: 'findProducts', description: 'Find all' })
  find( @Args('companyId', { type: () => String }) companyId: string, @Args() paginationArgs: SearchPaginationArgs, @Args() inputArgs: SearchInputArgs  ): Promise<void | ProductsProductResponseType> {
    this.logger.log(`>>> find: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.productsProductService.find(companyId, paginationArgs, inputArgs)
    .then( (response: ProductsProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< find: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsProductResponseType, { name: 'findOneProductByValue', description: 'Find product by value' })
  findOneByValue( @Args('companyId', { type: () => String }) companyId: string, @Args('value', { type: () => String }) value: string ): Promise<void | ProductsProductResponseType> {
    this.logger.log(`>>> findOneByValue: companyId=${companyId}, value=${value}`);
    const start = performance.now();

    return this.productsProductService.findOneByValue(companyId, value)
    .then( (response: ProductsProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< findOneByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  // TODO: falta validar que el id sea un uuid valido
  @Mutation(() => ProductsProductResponseType, { name: 'deleteProduct', description: 'Delete product' })
  delete( @Args('id', { type: () => String }) id: string ): Promise<void | ProductsProductResponseType> {
    this.logger.log(`>>> delete: id=${JSON.stringify(id)}`);
    const start = performance.now();

    return this.productsProductService.delete(id)
    .then( (response: ProductsProductResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< delete: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}