import express from 'express';
import { UserController } from './user.contoller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';



const router = express.Router();


router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  
  UserController.getAll
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  
  UserController.updateSingle
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  
  UserController.singleUser
);

export const UserRoutes = router