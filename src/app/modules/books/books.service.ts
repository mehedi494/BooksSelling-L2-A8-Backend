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

export const BooksService = {
  createBooks,
  getAllFromDb,
};