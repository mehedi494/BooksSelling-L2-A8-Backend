import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.routes';
import { BooksRoutes } from '../modules/books/books.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { OrdersRoutes } from '../modules/orders/orders.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';

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

  {
    path: '/orders',
    route: OrdersRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
