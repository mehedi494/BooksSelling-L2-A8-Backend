
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { IGenericErrorResponse } from '../interfaces/common';


const handleValidationError = (
  error: PrismaClientValidationError
): IGenericErrorResponse => {
 
  const statusCode = 400;
  return {
    statusCode,
    message: error.message,
    
  };
};

export default handleValidationError;
