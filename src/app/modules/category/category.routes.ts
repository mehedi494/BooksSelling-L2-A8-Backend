import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategory),
  CategoryController.createCategory
);

export const CategoryRoutes = router;
