import { NextFunction, Request, Response } from "express";
import * as HclinicaService from "../services/Hclinica.service";
import { AppError } from "../types/appErrors";
import { Hclinico } from "../models/HistoriaClinica.model";

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hclinicas = await HclinicaService.listHclinica();
    return res.status(200).json(hclinicas);
  } catch (error) {
    console.error("aca exploto", error);
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
    const hclinica = await HclinicaService.listHclinicaById(Number(id));
    if (!hclinica) {
      return next(new AppError("Historia clínica no encontrada", 404));
    }
    return res.status(200).json(hclinica);
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
    const hclinicaData: Hclinico = req.body;
    const newHclinica = await HclinicaService.CreateNewHclinica(hclinicaData);
    return res.status(201).json(newHclinica);
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

    const hclinicaData = req.body as Partial<Hclinico>;
    const updatedHclinica = await HclinicaService.UpdateHclinica(
      Number(id),
      hclinicaData,
    );

    if (!updatedHclinica) {
      return next(new AppError("Historia clínica no encontrada", 404));
    }
    return res.status(200).json(updatedHclinica);
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new AppError("El id de la historia clínica ya existe", 400));
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
    const deletedHclinica = await HclinicaService.DelHclinica(Number(id));
    if (!deletedHclinica) {
      return next(new AppError("Historia clínica no encontrada", 404));
    }
    return res.status(200).json({
      mensaje: `Historia clínica con ID ${id} eliminada exitosamente`,
    });
  } catch (error) {
    return next(error);
  }
};
