import { messageHelper } from '@helpers/message.helper';
import { compare } from 'bcryptjs';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { sign } from 'jsonwebtoken';
import { credentials } from '@config/credentials.config';
import { viewAuthenticatedUser } from '@shared/views/users.view';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<Record<string, unknown>> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(messageHelper.INVALID_USER, 401);
    }

    const passwordCompared = await compare(password, user.password);

    if (!passwordCompared) {
      throw new AppError(messageHelper.INVALID_USER, 401);
    }

    const authenticatedUser = viewAuthenticatedUser(user);

    const token = sign({ sub: user.id }, credentials.jwt, {
      expiresIn: '1d',
    });

    return {
      user: authenticatedUser,
      token,
    };
  }
}

export default CreateSessionService;
