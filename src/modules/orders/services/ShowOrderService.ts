import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError(messageHelper.NOT_FOUND, 404);
    }

    return order;
  }
}

export default ShowOrderService;
