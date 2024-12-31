import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { __dirname, PORT } from './configs.js';
import routes from './routes/index.routes.js';

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
app.listen(PORT, () => {
  console.log('Listening on PORT', PORT);
});

export default app;
