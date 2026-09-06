import { Request, Response, NextFunction } from 'express';

const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';

interface IErrorWithStatusCode extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: IErrorWithStatusCode,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || DEFAULT_ERROR_CODE;
  const message = statusCode === DEFAULT_ERROR_CODE ? DEFAULT_ERROR_MESSAGE : err.message;

  res.status(statusCode).send({ message });
};

export default errorHandler;
