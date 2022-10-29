import dotenv from 'dotenv';

dotenv.config();

export const credentials = {
  jwt: process.env.JWT_SECRET || '',
};
