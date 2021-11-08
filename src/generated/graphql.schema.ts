
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class SignInInput {
    email: string;
    password: string;
}

export class RequestPasswordResetInput {
    email: string;
}

export class ResetPasswordInput {
    email: string;
    token: string;
    password: string;
}

export class GoogleSignInInput {
    accessToken?: Nullable<string>;
}

export class CreateUserInput {
    name?: Nullable<string>;
    email: string;
    password: string;
    avatar?: Nullable<string>;
    role: string;
    refreshToken?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class UpdateUserInput {
    _id: string;
    name?: Nullable<string>;
    avatar?: Nullable<string>;
    role?: Nullable<string>;
    refreshToken?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class GoogleProfile {
    name?: Nullable<string>;
    avatar?: Nullable<string>;
    email?: Nullable<string>;
}

export class SignInResponse {
    message?: Nullable<string>;
    token?: Nullable<string>;
    error?: Nullable<boolean>;
}

export class GoogleSignInResponse {
    token?: Nullable<string>;
    googleProfile?: Nullable<GoogleProfile>;
    isVerify?: Nullable<boolean>;
}

export abstract class IMutation {
    abstract signIn(input: SignInInput): Nullable<SignInResponse> | Promise<Nullable<SignInResponse>>;

    abstract googleSignIn(input: GoogleSignInInput): Nullable<GoogleSignInResponse> | Promise<Nullable<GoogleSignInResponse>>;

    abstract createUser(input: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(input: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract getUser(_id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract getUsers(_id: string): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract removeUser(_id: string): Nullable<DeleteUserResponse> | Promise<Nullable<DeleteUserResponse>>;
}

export class User {
    _id: string;
    name?: Nullable<string>;
    email: string;
    password: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    avatar?: Nullable<string>;
    role: string;
    refreshToken?: Nullable<string>;
    _individual?: Nullable<Individual>;
}

export class Individual {
    name?: Nullable<string>;
    country?: Nullable<string>;
}

export class UserPayload {
    _id?: Nullable<string>;
    name?: Nullable<string>;
    role?: Nullable<string>;
    email?: Nullable<string>;
    avatar?: Nullable<string>;
    _company?: Nullable<string>;
}

export class DeleteUserResponse {
    success: boolean;
    message?: Nullable<string>;
}

export class SuccessMessage {
    message: string;
}

export class UsersPayload {
    users: Nullable<UserPayload>[];
    count: string;
}

export abstract class IQuery {
    abstract getAuthUser(): Nullable<UserPayload> | Promise<Nullable<UserPayload>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
