import { Prisma, books } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BooksSearchableField } from './books.constants';
import { IBooksRequest } from './books.interface';

const createBooks = async (data: books): Promise<books> => {
  const result = await prisma.books.create({
    data,
    include: {
      categories: true,
    },
  });

  return result;
};

const getAllFromDb = async (
  filters: IBooksRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<books[] | null>> => {
  const { search, minPrice, maxPrice, ...otherData } = filters;
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const andCondition = [];

  if (search) {
    andCondition.push({
      OR: BooksSearchableField.map(field => ({
        [field]: { contains: search, mode: 'insensitive' },
      })),
    });
  }

  if (minPrice !== undefined) {
    andCondition.push({
      price: { gte: minPrice }, // Minimum price condition
    });
  }

  if (maxPrice !== undefined) {
    andCondition.push({
      price: { lte: maxPrice }, // Maximum price condition
    });
  }

  if (Object.keys(otherData).length > 0) {
    andCondition.push({
      AND: Object.keys(otherData).map(key => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (otherData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.booksWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};
  const result = await prisma.books.findMany({
    where: whereCondition,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            title: 'desc',
          },
    include: {
      categories: true,
      review_rating: true,
    },
  });
  const total = await prisma.books.count();
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const byCategoryBook = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<books[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.books.findMany({
    where: {
      categoryId,
    },
    take: size,
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            title: 'desc',
          },
  });
  const total = await prisma.books.count();
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const singleBook = async (id: string): Promise<books | null> => {
  console.log(id);
  const result = await prisma.books.findUnique({
    where: {
      id,
    },
  });

  return result;
};
const updateSingle = async (
  id: string,
  payload: Partial<books>
): Promise<books | null> => {
  const result = await prisma.books.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};
const deleteSingle = async (id: string): Promise<books | null> => {
  const result = await prisma.books.delete({
    where: { id },
  });

  return result;
};

export const BooksService = {
  createBooks,
  getAllFromDb,
  byCategoryBook,
  singleBook,
  updateSingle,
  deleteSingle,
};
