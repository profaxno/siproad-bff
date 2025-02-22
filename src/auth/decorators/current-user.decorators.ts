import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Roles } from '../../admin/enums/roles.enums';
import { AdminUserType } from "src/admin/dto/types";
import { ForbiddenError } from "apollo-server-core";

export const CurrentUser = createParamDecorator( (validRoles: Roles[] = [], context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const user: AdminUserType = ctx.getContext().req.user;

  if(!user){
    throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`);
  }

  if(validRoles.length == 0)
    return user;

  // for (const role of user.) {
  //   if(validRoles.includes(user.))
  // }

  return user;

  // throw new ForbiddenException(`user need a valid role=[${JSON.stringify(validRoles)}]`)
});