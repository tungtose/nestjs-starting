import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from '@generated/graphql.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';



export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userModel.create(createUserInput);
    return user
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({});
  }

  async findOne(_id: string): Promise<User> {
    return await this.userModel.findById(_id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async update(_id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return await this.userModel.findByIdAndUpdate(_id, updateUserInput, { new: true });
  }

  async remove(_id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(_id);
  }
}
