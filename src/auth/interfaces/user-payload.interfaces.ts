export interface JwtPayload {
  _id: string
  email: string;
  name: string;
  expiration?: Date;
  role: string;
  permissions: any;
}
