import express from 'express';

import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { BooksRoutes } from '../modules/books/books.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/books',
    route: BooksRoutes,
  },
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
