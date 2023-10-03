import { category } from '@prisma/client';
import prisma from '../../../shared/prisma';
import {} from './category.service';

const createCategory = async (data: category): Promise<category> => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};
const getAll = async (): Promise<category[] | null> => {
  const result = await prisma.category.findMany({});
  return result;
};
const single = async (id: string): Promise<category | null> => {
  const result = await prisma.category.findUnique({
    where: { id },
    include: {
      books: true,
    },
  });
  return result;
};
const updateSingle = async (
  id: string,
  payload: Partial<category>
): Promise<category | null> => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
    include: {
      books: true,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAll,
  single,
  updateSingle,
};
