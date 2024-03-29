import dotenv from 'dotenv';
import 'express-async-errors';
import express from 'express';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

import cookieParser from 'cookie-parser';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';
// router:
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// db:
import connectDB from './db/connect.js';

import morgan from 'morgan';

import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, './frontend/build')));

dotenv.config();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'))
);
// middleware:
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is running on ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
