import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const { items, total } = req.body;

  Product.find({ _id: { $in: items } })
    .then((products) => {
      if (products.length !== items.length) {
        throw new BadRequestError('Один или несколько товаров не найдены');
      }

      const hasUnavailableProduct = products.some((product) => product.price === null);
      if (hasUnavailableProduct) {
        throw new BadRequestError('Один или несколько товаров недоступны для заказа');
      }

      const calculatedTotal = products.reduce((sum, product) => sum + (product.price ?? 0), 0);
      if (calculatedTotal !== total) {
        throw new BadRequestError('Некорректная сумма заказа');
      }

      return res.status(201).send({
        id: faker.string.uuid(),
        total,
      });
    })
    .catch(next);
};

export default createOrder;
