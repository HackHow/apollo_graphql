import * as dotenv from 'dotenv';
dotenv.config();
import * as argon2 from 'argon2';
import users from '../models/user_data.json';
import { jwtSign, jwtVerify } from '../../utils/util';
import { GraphQLError } from 'graphql';
const { SECRET, EXPIRED } = process.env;

interface UserInfo {
  account: string;
  password: string;
  name: string;
  birthday: string;
}
type Token = {
  token: string;
};

type Data = {
  userName: string;
};

type LoginInfo = {
  userInput: {
    account: string;
    password: string;
  };
};

export const resolvers = {
  Query: {
    login: async (parent: any, args: LoginInfo, context: any, info: any) => {
      if (Object.keys(args).length === 0) {
        throw new GraphQLError('Please input login info');
      }
      const { account, password } = args.userInput;
      const user: UserInfo | undefined = users.find(
        (item) => item.account === account
      );
      if (!user) throw new GraphQLError("Can't find the user");
      const passwordVerify: boolean = await argon2.verify(
        user.password,
        password
      );
      if (passwordVerify) {
        const token = await jwtSign({ userName: user.name }, SECRET!, {
          expiresIn: EXPIRED,
        });
        return { accessToken: token, expired: EXPIRED };
      } else {
        throw new GraphQLError('Wrong Password');
      }
    },

    me: async (parent: any, args: any, context: Token, info: any) => {
      const { token } = context;
      try {
        const { userName } = (await jwtVerify(token, SECRET!)) as Data;
        const userInfo: {}[] = users.filter((item) => item.name === userName);
        return userInfo[0];
      } catch (error) {
        throw new GraphQLError('invalid token');
      }
    },
  },
};
