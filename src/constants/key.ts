import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import fs from 'fs';

const privateKey = fs.readFileSync('./config/jwt/private.pem');
export const privateSecret = {
	key: privateKey,
	passphrase: 'PEMPassPhrase',
};
export const signOptions: SignOptions = {
	algorithm: 'RS256',
	expiresIn: '14d',
};

export const publicKey = fs.readFileSync('./config/jwt/public.pem');
export const verifyOptions: VerifyOptions = {
	algorithms: ['RS256'],
};
