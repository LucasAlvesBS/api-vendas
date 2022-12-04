import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRquest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRquest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError(messageHelper.NOT_FOUND, 404);
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
