import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';

import auth from '../../middlewares/auth';
import { OrderController } from './orders.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './orders.validation';

const router = express.Router();

router.post(
  '/create-order',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),validateRequest(OrderValidation.createOrder),OrderController.createOrder
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),OrderController.getAll
);

export const OrdersRoutes = router;
