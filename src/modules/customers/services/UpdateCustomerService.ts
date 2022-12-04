import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRquest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRquest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError(messageHelper.NOT_FOUND, 404);
    }

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== id) {
      throw new AppError(messageHelper.USER_CONFLICT, 409);
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);
  }
}

export default UpdateCustomerService;
