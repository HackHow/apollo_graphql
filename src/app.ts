import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let token: string | undefined = req.get('Authorization');
    if (!token) {
      return { message: 'Unauthorized' };
    } else {
      token = token.replace('Bearer ', '');
    }
    return { token };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
