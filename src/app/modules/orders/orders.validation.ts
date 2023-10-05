import z from 'zod';

const createOrder = z.object({
    body: z.object({
      orderedBooks: z.array(
        z.object({
          bookId: z.string({required_error:"must need string"}),
          quantity:z.number({required_error:"must need number"})
        })
      ),
    }),
  });

export const OrderValidation = {
  createOrder,
};
