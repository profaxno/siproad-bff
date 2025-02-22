import { HttpStatus, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from '../common/dto/args';


import { ProductsFormulaInput } from './dto/inputs/products-formula.input';
import { ProductsFormulaResponseType } from './dto/types/products-formula-response.type';
import { ProductsFormulaService } from './products-formula.service';

@Resolver()
export class ProductsFormulaResolver {

  private readonly logger = new Logger(ProductsFormulaResolver.name);

  constructor(
    private readonly productsFormulaService: ProductsFormulaService,
  ) {}

  @Mutation(() => ProductsFormulaResponseType, { name: 'updateFormula', description: 'Create/Update formula' })
  update( @Args('formula', { type: () => ProductsFormulaInput }) formula: ProductsFormulaInput ): Promise<void | ProductsFormulaResponseType> {
    this.logger.log(`>>> update: formula=${JSON.stringify(formula)}`);
    const start = performance.now();

    return this.productsFormulaService.update(formula)
    .then( (response: ProductsFormulaResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsFormulaResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsFormulaResponseType, { name: 'findFormulas', description: 'Find all' })
  find( @Args('companyId', { type: () => String }) companyId: string, @Args() paginationArgs: SearchPaginationArgs, @Args() inputArgs: SearchInputArgs  ): Promise<void | ProductsFormulaResponseType> {
    this.logger.log(`>>> find: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.productsFormulaService.find(companyId, paginationArgs, inputArgs)
    .then( (response: ProductsFormulaResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< find: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsFormulaResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsFormulaResponseType, { name: 'findOneFormulaByValue', description: 'Find formula by value' })
  findOneByValue( @Args('companyId', { type: () => String }) companyId: string, @Args('value', { type: () => String }) value: string ): Promise<void | ProductsFormulaResponseType> {
    this.logger.log(`>>> findOneByValue: companyId=${companyId}, value=${value}`);
    const start = performance.now();

    return this.productsFormulaService.findOneByValue(companyId, value)
    .then( (response: ProductsFormulaResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< findOneByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsFormulaResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  // TODO: falta validar que el id sea un uuid valido
  @Mutation(() => ProductsFormulaResponseType, { name: 'deleteFormula', description: 'Delete formula' })
  delete( @Args('id', { type: () => String }) id: string ): Promise<void | ProductsFormulaResponseType> {
    this.logger.log(`>>> delete: id=${JSON.stringify(id)}`);
    const start = performance.now();

    return this.productsFormulaService.delete(id)
    .then( (response: ProductsFormulaResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< delete: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsFormulaResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}