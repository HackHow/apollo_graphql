import { promisify } from 'util';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

export async function jwtSign(
  payload: JwtPayload,
  secret: Secret,
  expiresIn: SignOptions
) {
  return (await promisify<JwtPayload, Secret, SignOptions | undefined>(
    jwt.sign
  )(payload, secret, expiresIn)) as unknown;
}

export const jwtVerify = async (token: string, secret: Secret) => {
  return (await promisify<string, Secret>(jwt.verify)(
    token,
    secret
  )) as unknown;
};
