import { NextFunction, Request, Response } from 'express';
import * as Duenos  from '../services/Duenos.service';
import { DuenoData} from '../types/dtos';
import { AppError } from '../types/appErrors';
import {Dueno} from '../models/Dueno.model';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const usuarios = await Duenos.listDueno();
    return res.status(200).json(usuarios);
  } catch (error) {
    return next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params as { id: string };
  try {
    const usuario = await Duenos.listDuenoById(Number(id));
    if (!usuario) {
      return next(new AppError('Usuario no encontrado', 404));
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const duenoData: Omit<Dueno, "id"> = req.body;
    const newDueno = await Duenos.CreateNewDueno(duenoData);
    return res.status(201).json(newDueno);
  } catch (error) {
    return next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };

    const duenoData = req.body as Partial<DuenoData>;
    const updatedUsuario = await Duenos.UpdateDueno(
      Number(id),
      duenoData,
    );

    if (!updatedUsuario) {
      return next(new AppError('Dueno no encontrado', 404));
    }
    return res.status(200).json(updatedUsuario);
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new AppError('El nombre del dueno ya existe', 400));
    }

    return next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const deletedDueno = await Duenos.DelDueno(Number(id));
    if (!deletedDueno) {
      return next(new AppError('Dueno no encontrado', 404));
    }
    return res
      .status(200)
      .json({ mensaje: `Dueno con ID ${id} eliminado exitosamente` });
  } catch (error) {
    return next(error);
  }
};
