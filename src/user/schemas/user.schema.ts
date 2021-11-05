import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type Nullable<T> = T | null;

@Schema({ timestamps: true })
export class User {

  @Prop({ type: String })
  name?: Nullable<string>;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  avatar?: Nullable<string>;

  @Prop({ type: String })
  role: string;

  @Prop({ type: String })
  refreshToken?: Nullable<string>;

  @Prop({ type: String })
  _individual?: Nullable<string>;
}


export type UserDocument = User & Document;


export const UserSchema = SchemaFactory.createForClass(User);