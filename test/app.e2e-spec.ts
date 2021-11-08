import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as R from 'ramda';
import { AppModule } from './../src/app.module';
import { User } from '../src/user/schemas/user.schema';
import { print } from 'graphql/language/printer';
import gql from 'graphql-tag';

const CreateUserMutation = gql`
 mutation ($input: CreateUserInput!){
  createUser(input: $input) {
    name
    email
    password
    role
    avatar
  }
}
`
const graphql = '/graphql'
const mockUserInput = R.omit(['_id'], User.makeMockUser())

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User', () => {
    it('should create a user', async () => {
      const query = print(CreateUserMutation)
      return request(app.getHttpServer())
        .post(graphql)
        .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJ0dW5nQGNvZGVseW54LmlvIiwiX2lkIjoiMTIzNCIsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbeyJhY3Rpb24iOiJyZWFkIiwic3ViamVjdCI6ImFsbCJ9XSwiaWF0IjoxNjM2MzA0NTQ2LCJleHAiOjE2MzYzMDgxNDZ9.6BmewDZx56p--QyMiIOUgPHFU4j1hDNkXCsXQt9qhcc')
        .send({
          query,
          variables: { input: mockUserInput }
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data.createUser).toEqual(mockUserInput);
        })
    })
  })
});
