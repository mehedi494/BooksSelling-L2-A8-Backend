import { category } from '@prisma/client';
import prisma from '../../../shared/prisma';
import {  } from './category.service';

const createCategory = async (data: category): Promise<category> => {
   
    const result = await prisma.category.create({
      data,
  
      
    });
    
  
    return result;
  };

  export const CategoryService ={
    createCategory
  }