import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRquest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRquest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError(messageHelper.NOT_FOUND, 404);
    }

    return user;
  }
}

export default ShowUserService;
