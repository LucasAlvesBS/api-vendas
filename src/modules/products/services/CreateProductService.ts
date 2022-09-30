import { messageHelper } from '@helpers/message.helper';
import AppError from '@shared/errors/app-error';
import { getCustomRepository } from 'typeorm';
import { CreateProductDto } from '../typeorm/dtos/CreateProduct.dto';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class CreateProductService {
  public async execute(body: CreateProductDto): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(body.name);

    if (productExists) {
      throw new AppError(messageHelper.CONFLICT, 409);
    }

    const product = productsRepository.create(body);

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
