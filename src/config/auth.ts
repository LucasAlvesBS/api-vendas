import dotenv from 'dotenv';

dotenv.config();

export const auth = {
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
