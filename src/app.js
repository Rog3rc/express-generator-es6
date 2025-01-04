import createError from 'http-errors';
import express from 'express';
import { join } from 'node:path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { __dirname, ENV } from './config.js';
import routes from './routes/index.routes.js';

const app = express();

// View engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// Create set routes
routes.forEach(({ url, method, handler }) => {
  method = method.toLowerCase();
  app[method](url, handler);
});

// Catch 404 send err handler
app.use((req, res, next) => {
  next(createError(404));
});

// Err handler
app.use((err, req, res, next) => {
  // Set Locals & send err dev mode
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render Err Page
  res.status(err.status || 500);
  res.render('error');
});

// Start server
app.listen(ENV.PORT, () => {
  console.log('Listening on PORT', ENV.PORT);
});

export default app;
