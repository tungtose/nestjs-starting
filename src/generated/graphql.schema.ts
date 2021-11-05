
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class GoogleSignInInput {
    accessToken?: Nullable<string>;
}

export class SignUpInput {
    name?: Nullable<string>;
    avatar?: Nullable<string>;
    companyName: string;
    country?: Nullable<string>;
    type?: Nullable<string>;
    listed?: Nullable<boolean>;
    businessCategory?: Nullable<string>;
    CEOName?: Nullable<string>;
    foundedIn?: Nullable<string>;
    companyCode?: Nullable<string>;
    taxCode?: Nullable<string>;
    logo?: Nullable<string>;
    role?: Nullable<string>;
    email?: Nullable<string>;
    enterpriseEmail?: Nullable<string>;
    password?: Nullable<string>;
    revenue?: Nullable<string>;
    headquarter?: Nullable<string>;
    employees?: Nullable<string>;
    stock?: Nullable<string>;
    exchange?: Nullable<string>;
}

export class IndividualSignUpInput {
    email: string;
    password: string;
    country?: Nullable<string>;
    name: string;
}

export class SignInInput {
    email: string;
    password: string;
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

export class RequestPasswordResetInput {
    email: string;
}

export class ResetPasswordInput {
    email: string;
    token: string;
    password: string;
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

export class Token {
    token?: Nullable<string>;
    message?: Nullable<string>;
}

export class Individual {
    name?: Nullable<string>;
    country?: Nullable<string>;
}

export class GoogleProfile {
    name?: Nullable<string>;
    avatar?: Nullable<string>;
    email?: Nullable<string>;
}

export class UserPayload {
    _id?: Nullable<string>;
    name?: Nullable<string>;
    role?: Nullable<string>;
    email?: Nullable<string>;
    avatar?: Nullable<string>;
    _company?: Nullable<string>;
}

export class SignUpResponse {
    message?: Nullable<string>;
    error?: Nullable<boolean>;
}

export class IndividualSignUpResponse {
    message?: Nullable<string>;
    error?: Nullable<boolean>;
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

export abstract class IMutation {
    abstract createUser(input: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract businessSignup(input: SignUpInput): Nullable<SignUpResponse> | Promise<Nullable<SignUpResponse>>;

    abstract individualSignup(input: IndividualSignUpInput): Nullable<IndividualSignUpResponse> | Promise<Nullable<IndividualSignUpResponse>>;

    abstract signIn(input: SignInInput): Nullable<SignInResponse> | Promise<Nullable<SignInResponse>>;

    abstract googleSignIn(input: GoogleSignInInput): Nullable<GoogleSignInResponse> | Promise<Nullable<GoogleSignInResponse>>;
}

type Nullable<T> = T | null;
