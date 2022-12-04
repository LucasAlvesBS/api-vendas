import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRquest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRquest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError(messageHelper.NOT_FOUND, 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
