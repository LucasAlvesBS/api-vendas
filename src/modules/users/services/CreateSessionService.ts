import { messageHelper } from '@helpers/message.helper';
import { compare } from 'bcryptjs';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(messageHelper.INVALID_USER, 401);
    }

    const passwordCompared = await compare(password, user.password);

    if (!passwordCompared) {
      throw new AppError(messageHelper.INVALID_USER, 401);
    }

    return user;
  }
}

export default CreateSessionService;
