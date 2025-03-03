import { HttpStatus, Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SearchInputArgs, SearchPaginationArgs } from 'src/common/dto/args';

import { ProductsElementInput } from './dto/inputs/products-element.input';
import { ProductsElementResponseType } from './dto/types/products-element-response.type';
import { ProductsElementService } from './products-element.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';
import { PermissionsEnum } from 'src/admin/enums/permissions.enum';
import { AdminUserType } from 'src/admin/dto/types';

@Resolver()
export class ProductsElementResolver {

  private readonly logger = new Logger(ProductsElementResolver.name);

  constructor(
    private readonly productsElementService: ProductsElementService,
  ) {}

  @Mutation(() => ProductsElementResponseType, { name: 'updateElement', description: 'Create/Update element' })
  @UseGuards( JwtAuthGuard )
  update(
    @CurrentUser([PermissionsEnum.PRODUCTS_ELEMENT_WRITE]) userDto: AdminUserType, 
    @Args('element', { type: () => ProductsElementInput }) element: ProductsElementInput 
  ): Promise<ProductsElementResponseType> {

    element.companyId = userDto.companyId;
    this.logger.log(`>>> update: element=${JSON.stringify(element)}`);
    const start = performance.now();

    return this.productsElementService.update(element)
    .then( (response: ProductsElementResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< update: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsElementResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsElementResponseType, { name: 'findElements', description: 'Find all' })
  @UseGuards( JwtAuthGuard )
  find(
    @CurrentUser([PermissionsEnum.PRODUCTS_ELEMENT_READ]) userDto: AdminUserType,
    @Args() paginationArgs: SearchPaginationArgs,
    @Args() inputArgs: SearchInputArgs
  ): Promise<ProductsElementResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> find: companyId=${companyId}, paginationDto=${JSON.stringify(paginationArgs)}, inputArgs:${JSON.stringify(inputArgs)}`);
    const start = performance.now();

    return this.productsElementService.find(companyId, paginationArgs, inputArgs)
    .then( (response: ProductsElementResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< find: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsElementResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  @Query(() => ProductsElementResponseType, { name: 'findOneElementByValue', description: 'Find element by value' })
  @UseGuards( JwtAuthGuard )
  findOneByValue(
    @CurrentUser([PermissionsEnum.PRODUCTS_ELEMENT_READ]) userDto: AdminUserType,
    @Args('value', { type: () => String }) value: string
  ): Promise<ProductsElementResponseType> {

    const companyId = userDto.companyId;
    this.logger.log(`>>> findOneByValue: companyId=${companyId}, value=${value}`);
    const start = performance.now();

    return this.productsElementService.findOneByValue(companyId, value)
    .then( (response: ProductsElementResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< findOneByValue: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsElementResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

  // TODO: falta validar que el id sea un uuid valido
  @Mutation(() => ProductsElementResponseType, { name: 'deleteElement', description: 'Delete element' })
  @UseGuards( JwtAuthGuard )
  delete(
    @CurrentUser([PermissionsEnum.PRODUCTS_ELEMENT_WRITE]) userDto: AdminUserType,
    @Args('id', { type: () => String }) id: string
  ): Promise<ProductsElementResponseType> {

    this.logger.log(`>>> delete: id=${JSON.stringify(id)}`);
    const start = performance.now();

    return this.productsElementService.delete(id)
    .then( (response: ProductsElementResponseType) => {
      const end = performance.now();
      this.logger.log(`<<< delete: OK, runtime=${(end - start) / 1000} seconds, response=${JSON.stringify(response)}`);
      return response;
    })
    .catch((error) => {
      this.logger.error(error.stack);
      return new ProductsElementResponseType(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    })
  }

}