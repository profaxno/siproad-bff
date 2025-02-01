import { HttpStatus, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { SearchArgs } from 'src/common/dto/args/search.args';

import { InputProductsProductDto, ProductsProductDto } from './dto/products-product.dto';
import { ProductsProductResponseDto } from './dto/products-response-dto';
import { ProductsProductService } from './products-product.service';

@Resolver()
export class ProductsProductResolver {

  private readonly logger = new Logger(ProductsProductResolver.name);

  constructor(
    private readonly productsProductService: ProductsProductService,
  ) {}

  @Mutation(() => ProductsProductResponseDto, { name: 'updateProduct', description: 'Create/Update product' })
  updateProduct( @Args('product', { type: () => InputProductsProductDto }) product: ProductsProductDto ): Promise<void | ProductsProductResponseDto> {
    this.logger.log(`>>> updateProduct: product=${JSON.stringify(product)}`);
    const start = performance.now();

    return this.productsProductService.updateProduct(product)
    .then( (response: ProductsProductResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< updateProduct: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsProductResponseDto, { name: 'findProducts', description: 'Find all products' })
  findProducts( @Args('companyId', { type: () => String }) companyId: string, @Args() paginationDto: PaginationArgs, @Args() searchArgs: SearchArgs  ): Promise<void | ProductsProductResponseDto> {
    this.logger.log(`>>> findProducts: companyId=${companyId}, paginationDto=${paginationDto}`);
    const start = performance.now();

    return this.productsProductService.findProducts(companyId, paginationDto, searchArgs)
    .then( (response: ProductsProductResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< findProducts: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsProductResponseDto, { name: 'findOneProductByValue', description: 'Find product by value' })
  findOneProductByValue( @Args('companyId', { type: () => String }) companyId: string, @Args('value', { type: () => String }) value: string ): Promise<void | ProductsProductResponseDto> {
    this.logger.log(`>>> findOneProductByValue: companyId=${companyId}, value=${value}`);
    const start = performance.now();

    return this.productsProductService.findOneProductByValue(companyId, value)
    .then( (response: ProductsProductResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< findOneProductByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  // TODO: falta validar que el id sea un uuid valido
  @Mutation(() => ProductsProductResponseDto, { name: 'deleteProduct', description: 'Delete product' })
  deleteProduct( @Args('id', { type: () => String }) id: string ): Promise<void | ProductsProductResponseDto> {
    this.logger.log(`>>> deleteProduct: id=${JSON.stringify(id)}`);
    const start = performance.now();

    return this.productsProductService.deleteProduct(id)
    .then( (response: ProductsProductResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< deleteProduct: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsProductResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}