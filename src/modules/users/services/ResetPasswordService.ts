import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError(messageHelper.TOKEN_NOT_FOUND, 404);
    }

    const user = await usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError(messageHelper.USER_NOT_FOUND, 404);
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError(messageHelper.TOKEN_EXPIRED);
    }

    user.password = await hash(password, 10);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
