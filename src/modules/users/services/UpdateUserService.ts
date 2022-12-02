import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRquest {
  id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    oldPassword,
  }: IRquest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError(messageHelper.NOT_FOUND, 404);
    }

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== id) {
      throw new AppError(messageHelper.USER_CONFLICT, 409);
    }

    if (password && !oldPassword) {
      throw new AppError(messageHelper.OLD_PASSWORD_REQUIRED, 400);
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError(messageHelper.DOES_NOT_MATCH, 400);
      }

      user.password = await hash(password, 10);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);
  }
}

export default UpdateUserService;
