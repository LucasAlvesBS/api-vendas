import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRquest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRquest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError(messageHelper.NOT_FOUND, 404);
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError(messageHelper.PRODUCT_CONFLICT, 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);
  }
}

export default UpdateProductService;
