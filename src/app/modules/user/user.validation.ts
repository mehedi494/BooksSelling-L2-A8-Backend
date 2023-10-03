import z, { string } from 'zod';

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.string({}).optional(),
    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
    address: z.string({}).optional(),
    profileImg: z.string({}).optional(),
  }),
});
const updateUser = z.object({
  body: z.object({
    name: z.string({}).optional(),
    email: z.string({}).optional(),
    password: z.string({}).optional(),
    role: z.string({}).optional(),
    contactNo: z.string({}).optional(),
    address: z.string({}).optional(),
    profileImg: z.string({}).optional(),
  }),
});

const login = z.object({
  body: z.object({
    email: string({
      required_error: 'email is requied must!',
    }),
    password: string({
      required_error: 'password is requied must!',
    }),
  }),
});
export const UserValidation = {
  createUser,
  updateUser,
  login,
};
