import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRquest {
  id: string;
}

class DeleteProductService {
  public async execute(id: IRquest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError(messageHelper.NOT_FOUND, 404);
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
