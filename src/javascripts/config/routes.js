import express from 'express';
import { indexPage, aboutPage } from '../components/controllers/index';
import { allMoviesAPI } from '../components/controllers/movies';

let router = express.Router();

export function configureRoutes(app) {
  router.get('/', indexPage);
  router.get('/about', aboutPage);
  router.get('/movies*', indexPage);
  router.get('/api/movies', allMoviesAPI);

  app.use('/', router);
}

