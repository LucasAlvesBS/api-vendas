import { auth } from '@config/auth';
import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(messageHelper.TOKEN_MISSING);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, auth.jwtSecret);

    const { sub } = decodedToken;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError(messageHelper.INVALID_TOKEN);
  }
};
