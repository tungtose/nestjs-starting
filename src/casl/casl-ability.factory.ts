import { Ability, InferSubjects, AbilityBuilder, AbilityClass, ExtractSubjectType, SubjectRawRule, SubjectType, MongoQuery } from '@casl/ability'
import { Injectable } from '@nestjs/common';
import { User } from '@generated/graphql.schema';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Update = 'update',
  Read = 'read',
  Delete = 'delete',
}

type Subjects = InferSubjects<typeof User> | 'all' | 'user';

export type AppAbility = Ability<[Action, Subjects]>;

export interface IPermission {
  action: string;
  subject: string;
}
export interface IUserPayload {
  _id: string;
  role: string;
  permissions: SubjectRawRule<
    string,
    SubjectType,
    MongoQuery<Record<string | number | symbol, unknown>>
  >[];
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: IUserPayload) {

    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.role === 'admin') {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }
    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });
    new Ability(user.permissions)

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}