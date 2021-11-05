
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

try {
  const definitionsFactory = new GraphQLDefinitionsFactory();
  const path = join(process.cwd(), 'src/generated/graphql.schema.ts');
  definitionsFactory.generate({
    typePaths: ['./src/**/*.graphql'],
    path,
    outputAs: 'class',
    debug: true,
    watch: true
  });
} catch (error) {
  console.error(error);
}