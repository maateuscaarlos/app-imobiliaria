import {ErrorRequestHandler} from 'express'
import {ValidationError}  from 'yup';

interface ValidationErrors{
  [key: string]: string[];
}


const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof ValidationError) {
        const errors: ValidationErrors = {};
  
        error.inner.forEach(err => {
          errors[err.name] = err.errors;
        });
  
        return response.status(400).json(errors);
      }
      console.log(error);
  
      return response.status(500).json({ message: 'Internal Server Error' });
    };

export default errorHandler;
