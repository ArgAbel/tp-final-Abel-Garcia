import { NextFunction, Request, Response } from 'express';
import * as UsuarioService from '../services/Usuarios.service';
import { UsuarioData } from '../types/dtos';
import { AppError } from '../types/appErrors';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
    const usuarios = await UsuarioService.listUsuario();
    return res.status(200).json(usuarios);
  } catch (error) {
    return next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params as { id: string };
  try {
    const usuario = await UsuarioService.listUsuarioById(Number(id));
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
    const usuarioData: UsuarioData = req.body;
    const newUsuario = await UsuarioService.CreateNewUsuario(usuarioData);
    return res.status(201).json(newUsuario);
  } catch (error) {
    return next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };

    const usuarioData = req.body as Partial<UsuarioData>;
    const updatedUsuario = await UsuarioService.UpdatUsuario(
      Number(id),
      usuarioData,
    );

    if (!updatedUsuario) {
      return next(new AppError('Usuario no encontrado', 404));
    }
    return res.status(200).json(updatedUsuario);
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new AppError('El nombre del usuario ya existe', 400));
    }

    return next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const { id } = req.params as { id: string };
    const deletedUsuario = await UsuarioService.DelUsuario(Number(id));
    if (!deletedUsuario) {
      return next(new AppError('Usuario no encontrado', 404));
    }
    return res
      .status(200)
      .json({ mensaje: `Usuario con ID ${id} eliminado exitosamente` });
  } catch (error) {
    return next(error);
  }
};
