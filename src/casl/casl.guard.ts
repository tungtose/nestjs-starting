import { Ability, AbilityTuple, MongoQuery, Subject } from '@casl/ability';
import { SetMetadata, Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';

export interface IPermissionHandler {
  handle(
    ability: Ability<
      AbilityTuple<string, Subject>,
      MongoQuery<Record<string | number | symbol, unknown>>
    >,
  ): boolean;
}

export type PermissionHandlerCallback = (
  ability: Ability<
    AbilityTuple<string, Subject>,
    MongoQuery<Record<string | number | symbol, unknown>>
  >,
) => boolean;

export type PermissionHandler = IPermissionHandler | PermissionHandlerCallback;

export interface IPermission {
  action: string;
  subject: string;
}
export interface IUserPayload {
  _id: string;
  role: string;
  permissions: IPermission[];
}

export const CHECK_PERMISSION_KEY = 'check_permission';
export const CheckPermission = (...handlers: PermissionHandler[]) => SetMetadata(CHECK_PERMISSION_KEY, handlers);

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const gqlContext = GqlExecutionContext.create(context);

    const permissionsHandler =
      this.reflector.get<PermissionHandler[]>(
        CHECK_PERMISSION_KEY,
        gqlContext.getHandler(),
      ) || [];



      console.log("Ctx", gqlContext.getContext())
 
      if (!gqlContext.getContext().user) {
        console.log("MATCH NO CONTEXT!")
        return false;
      }
  
    const user: IUserPayload = gqlContext.getContext().user;
    // const permissions = user.permissions.map((p) => ({
    //   action: p.action,
    //   subject: p.subject,
    // }));
    const ability = this.caslAbilityFactory.createForUser(user);


    return permissionsHandler.every((handler) =>
      this.execPermissionHandler(handler, ability),
    );
  }

  private execPermissionHandler(handler: PermissionHandler, ability: Ability<
    AbilityTuple<string, Subject>,
    MongoQuery<Record<string | number | symbol, unknown>>
  >,) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}