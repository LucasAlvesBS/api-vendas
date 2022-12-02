import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRquest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRquest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError(messageHelper.NOT_FOUND, 404);
    }

    await usersRepository.remove(user);
  }
}

export default DeleteUserService;
