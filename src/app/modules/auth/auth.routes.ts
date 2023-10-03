import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { UserController } from './auth.controller';



const router = express.Router();

router.post(
  '/signup',
/*   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), */
  validateRequest(UserValidation.createUser),
  UserController.createUser
);
router.post(
  '/login',
/*   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), */
  validateRequest(UserValidation.login),
  UserController.loginUser
);


export const AuthRoutes = router