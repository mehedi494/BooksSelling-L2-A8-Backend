import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BooksController } from './books.controller';
import { BookSValidation } from './books.validation';

const router = express.Router();

// Import necessary modules and dependencies

// Define your routes
router.get('/:categoryId/category', BooksController.byCategoryBook);
router.get('/:id', BooksController.singleBook);

// Create a new book (accessible to SUPER_ADMIN and ADMIN users)
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // Authentication middleware
  validateRequest(BookSValidation.createBooks), // Request validation middleware
  BooksController.createBook // Route handler for creating a book
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // Authentication middleware
  validateRequest(BookSValidation.updateBook), // Request validation middleware
  BooksController.updateSingle // Route handler for creating a book
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // Authentication middleware
  BooksController.deleteSingle
);

// Get all books from the database
router.get('/', BooksController.getAllFromDb);

export const BooksRoutes = router;
