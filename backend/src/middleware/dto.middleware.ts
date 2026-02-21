import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../types/appErrors';

const validateDto = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  console.log('Validating DTO for request to', errors);

  if (errors.isEmpty()) {
    return next(); // No errors, continue to the controller
  }

  console.log('Errores de validación:', errors.array());
  if (!errors.isEmpty()) {
    const message = errors.array().map(e => {
      const param = 'param' in e ? e.param : 'unknown';
      return `${param}: ${e.msg}`;
    }).join('. ');
    return next(new AppError(message, 400));
  }

  next();
};

export default validateDto;
