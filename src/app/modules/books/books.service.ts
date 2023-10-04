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
  const { search, ...otherData } = filters;
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const andCondition = [];
  console.log(otherData);
  if (search) {
    andCondition.push({
      OR: BooksSearchableField.map(field => ({
        [field]: { contains: search, mode: 'insensitive' },
      })),
    });
  }

  if (Object.keys(otherData).length > 0) {
    andCondition.push({
      AND: Object.keys(otherData).map(key => ({
        [key]: {
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
    take: limit,
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
  const totalPage = Math.ceil(total / limit);
  return {
    meta: {
      total,
      page,
      limit,
      totalPage,
    },
    data: result,
  };
};

const byCategoryBook = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<books[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.books.findMany({
    where: {
      categoryId,
    },
    take: limit,
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
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const singleBook = async (id: string): Promise<Partial<books> | null> => {
  console.log(id);
  const result = await prisma.books.findUnique({
    where: {
      id,
    },
    // select: {
    //   author: true,
    //   categoryId: true,
    //   genre: true,
    //   id: true,
    //   price: true,
    //   publicationDate: true,
    //   title: true,
    // },
  });

  return result;
};

export const BooksService = {
  createBooks,
  getAllFromDb,
  byCategoryBook,
  singleBook,
};
