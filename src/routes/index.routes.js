import { indexView } from '../controllers/index.controllers.js';

const routes = [
  {
    url: '/',
    method: 'GET',
    handler: indexView,
  },
];

export default routes;
