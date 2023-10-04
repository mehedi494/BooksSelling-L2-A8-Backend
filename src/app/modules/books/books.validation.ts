import z from 'zod';

const createBooks = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    author: z.string({
      required_error: 'author is required',
    }),
    genre: z.string({
      required_error: 'genre is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    publicationDate: z.string({
      required_error: 'publicationDate is requred',
    }),
    categoryId: z.string({
      required_error: 'categoryId is mustbe need',
    }),
  }),
});
const updateBook = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
    author: z
      .string({
        required_error: 'author is required',
      })
      .optional(),
    genre: z
      .string({
        required_error: 'genre is required',
      })
      .optional(),
    price: z
      .number({
        required_error: 'price is required',
      })
      .optional(),
    publicationDate: z
      .string({
        required_error: 'publicationDate is requred',
      })
      .optional(),
    categoryId: z
      .string({
        required_error: 'categoryId is mustbe need',
      })
      .optional(),
  }),
});
export const BookSValidation = {
  createBooks,updateBook
};
