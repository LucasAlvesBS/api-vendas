import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRquest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRquest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError(messageHelper.NOT_FOUND, 404);
    }

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists && email !== user.email) {
      throw new AppError(messageHelper.USER_CONFLICT, 409);
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await usersRepository.save(user);
  }
}

export default UpdateUserService;
