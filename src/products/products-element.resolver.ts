import { HttpStatus, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from 'src/common/dto/args';

import { InputProductsElementDto, ProductsElementDto } from './dto/products-element.dto';
import { ProductsElementResponseDto } from './dto/products-response-dto';
import { ProductsElementService } from './products-element.service';

@Resolver()
export class ProductsElementResolver {

  private readonly logger = new Logger(ProductsElementResolver.name);

  constructor(
    private readonly productsElementService: ProductsElementService,
  ) {}

  @Mutation(() => ProductsElementResponseDto, { name: 'updateElement', description: 'Create/Update element' })
  updateElement( @Args('element', { type: () => InputProductsElementDto }) element: InputProductsElementDto ): Promise<void | ProductsElementResponseDto> {
    this.logger.log(`>>> updateElement: element=${JSON.stringify(element)}`);
    const start = performance.now();

    return this.productsElementService.updateElement(element)
    .then( (response: ProductsElementResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< updateElement: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsElementResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsElementResponseDto, { name: 'findElements', description: 'Find all' })
  findElements( @Args('companyId', { type: () => String }) companyId: string, @Args() paginationArgs: SearchPaginationArgs, @Args() inputArgs: SearchInputArgs ): Promise<void | ProductsElementResponseDto> {
    this.logger.log(`>>> findElements: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.productsElementService.findElements(companyId, paginationArgs, inputArgs)
    .then( (response: ProductsElementResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< findElements: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsElementResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsElementResponseDto, { name: 'findOneElementByValue', description: 'Find element by value' })
  findOneElementByValue( @Args('companyId', { type: () => String }) companyId: string, @Args('value', { type: () => String }) value: string ): Promise<void | ProductsElementResponseDto> {
    this.logger.log(`>>> searchElementByValue: companyId=${companyId}, value=${value}`);
    const start = performance.now();

    return this.productsElementService.findOneElementByValue(companyId, value)
    .then( (response: ProductsElementResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< searchElementByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsElementResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  // TODO: falta validar que el id sea un uuid valido
  @Mutation(() => ProductsElementResponseDto, { name: 'deleteElement', description: 'Delete element' })
  deleteElement( @Args('id', { type: () => String }) id: string ): Promise<void | ProductsElementResponseDto> {
    this.logger.log(`>>> deleteElement: id=${JSON.stringify(id)}`);
    const start = performance.now();

    return this.productsElementService.deleteElement(id)
    .then( (response: ProductsElementResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< deleteElement: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsElementResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}