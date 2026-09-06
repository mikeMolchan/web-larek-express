import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors as celebrateErrors } from 'celebrate';
import { PORT, DB_ADDRESS } from './config';
import routes from './routes';
import notFoundHandler from './middlewares/not-found';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
app.use(routes);
app.use(notFoundHandler);
app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);

mongoose.connect(DB_ADDRESS)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Подключение к базе данных установлено');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Ошибка подключения к базе данных', error);
  });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порте ${PORT}`);
});
