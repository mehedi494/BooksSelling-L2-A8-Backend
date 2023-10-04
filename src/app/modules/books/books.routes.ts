import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BooksController } from './books.controller';
import { BookSValidation } from './books.validation';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BookSValidation.createBooks),
  BooksController.createBook
);
router.get('/', BooksController.getAllFromDb);
router.get('/:categoryId/category', BooksController.byCategoryBook);

export const BooksRoutes = router;
