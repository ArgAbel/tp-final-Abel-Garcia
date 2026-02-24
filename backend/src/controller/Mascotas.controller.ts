import { NextFunction, Request, Response } from "express";
import * as Mascota from "../services/Mascota.service";
import { AppError } from "../types/appErrors";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const mascotas = await Mascota.listMascota();
    return res.status(200).json(mascotas);
  } catch (error) {
    return next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params as { id: string };
  try {
    const mascota = await Mascota.listMascotaById(Number(id));
    if (!mascota) {
      return next(new AppError("Mascota no encontrada", 404));
    }
    return res.status(200).json(mascota);
  } catch (error) {
    return next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const mascotaData = req.body;
    const newMascota = await Mascota.CreateNewMascota(mascotaData);
    return res.status(201).json(newMascota);
  } catch (error) {
    return next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };

    const mascotaData = req.body;
    const updatedMascota = await Mascota.UpdateMascota(Number(id), mascotaData);

    if (!updatedMascota) {
      return next(new AppError("Mascota no encontrada", 404));
    }
    return res.status(200).json(updatedMascota);
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new AppError("El nombre de la mascota ya existe", 400));
    }

    return next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const deletedMascota = await Mascota.DelMascota(Number(id));
    if (!deletedMascota) {
      return next(new AppError("Mascota no encontrada", 404));
    }
    return res
      .status(200)
      .json({ mensaje: `Mascota con ID ${id} eliminada exitosamente` });
  } catch (error) {
    return next(error);
  }
};
