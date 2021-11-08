import { Ability, InferSubjects, AbilityBuilder, AbilityClass, SubjectRawRule, MongoQuery } from '@casl/ability'
import { Injectable } from '@nestjs/common';
import { User } from '@generated/graphql.schema';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Update = 'update',
  Read = 'read',
  Delete = 'delete',
}

export type Subjects = 'all' | 'user';

export type AppAbility = Ability<[Action, Subjects]>;

export interface IPermission {
  action: string;
  subject: string;
}
export interface IUserPayload {
  _id: string;
  role: string;
  permissions: SubjectRawRule<
    Action,
    Subjects,
    MongoQuery<Record<string | number | symbol, unknown>>
  >[];
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: IUserPayload) {

    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    console.log("MY USser:",  user)

    if (user.role === 'admin') {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    for(const permission of user.permissions) {
      const {action, subject} = permission;
      can(action, subject)
    }

    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });
  
    return build();
  }
}