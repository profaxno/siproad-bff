import { HttpStatus, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { SearchArgs } from 'src/common/dto/args/search.args';

import { InputProductsFormulaDto, ProductsFormulaDto } from './dto/products-formula.dto';
import { ProductsFormulaResponseDto } from './dto/products-response-dto';
import { ProductsFormulaService } from './products-formula.service';

@Resolver()
export class ProductsFormulaResolver {

  private readonly logger = new Logger(ProductsFormulaResolver.name);

  constructor(
    private readonly productsFormulaService: ProductsFormulaService,
  ) {}

  @Mutation(() => ProductsFormulaResponseDto, { name: 'updateFormula', description: 'Create/Update formula' })
  updateFormula( @Args('formula', { type: () => InputProductsFormulaDto }) formula: ProductsFormulaDto ): Promise<void | ProductsFormulaResponseDto> {
    this.logger.log(`>>> updateFormula: formula=${JSON.stringify(formula)}`);
    const start = performance.now();

    return this.productsFormulaService.updateFormula(formula)
    .then( (response: ProductsFormulaResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< updateFormula: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsFormulaResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsFormulaResponseDto, { name: 'findFormulas', description: 'Find all formulas' })
  findFormulas( @Args('companyId', { type: () => String }) companyId: string, @Args() paginationDto: PaginationArgs, @Args() searchArgs: SearchArgs  ): Promise<void | ProductsFormulaResponseDto> {
    this.logger.log(`>>> findFormulas: companyId=${companyId}, paginationDto=${paginationDto}`);
    const start = performance.now();

    return this.productsFormulaService.findFormulas(companyId, paginationDto, searchArgs)
    .then( (response: ProductsFormulaResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< findFormulas: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsFormulaResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsFormulaResponseDto, { name: 'findOneFormulaByValue', description: 'Find formula by value' })
  findOneFormulaByValue( @Args('companyId', { type: () => String }) companyId: string, @Args('value', { type: () => String }) value: string ): Promise<void | ProductsFormulaResponseDto> {
    this.logger.log(`>>> findOneFormulaByValue: companyId=${companyId}, value=${value}`);
    const start = performance.now();

    return this.productsFormulaService.findOneFormulaByValue(companyId, value)
    .then( (response: ProductsFormulaResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< findOneFormulaByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsFormulaResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  // TODO: falta validar que el id sea un uuid valido
  @Mutation(() => ProductsFormulaResponseDto, { name: 'deleteFormula', description: 'Delete formula' })
  deleteFormula( @Args('id', { type: () => String }) id: string ): Promise<void | ProductsFormulaResponseDto> {
    this.logger.log(`>>> deleteFormula: id=${JSON.stringify(id)}`);
    const start = performance.now();

    return this.productsFormulaService.deleteFormula(id)
    .then( (response: ProductsFormulaResponseDto) => {
      const end = performance.now();
      this.logger.log(`<<< deleteFormula: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsFormulaResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}