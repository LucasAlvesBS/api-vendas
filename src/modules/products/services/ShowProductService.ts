import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRquest {
  id: string;
}

class ShowProductService {
  public async execute(id: IRquest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}

export default ShowProductService;
