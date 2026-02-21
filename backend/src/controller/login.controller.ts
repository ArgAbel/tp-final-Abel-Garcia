import { NextFunction, Request, Response } from 'express';
import * as loginService from '../services/login.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    
    const userId = await loginService.register(username, email, password);
    
    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado con éxito',
      data: { userId }
    });
  } catch (error) {
    next(error); // Envía el error al errorHandler global
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const { email, password } = req.body;
    
    const token = await loginService.login(email, password);
    
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (error) {
    next(error); // Si el servicio lanza un AppError, el errorHandler lo capturará
  }
};