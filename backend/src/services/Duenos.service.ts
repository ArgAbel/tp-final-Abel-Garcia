import * as Dueno from '../models/Dueno.model';
import { DuenoData } from '../types/dtos';


export const listDueno = async (): Promise<Dueno.Dueno[]> => {
  return Dueno.getAllDuenos();
};

export const CreateNewDueno = async (data: Omit<Dueno.Dueno, "id">): Promise<DuenoData> => {
  await Dueno.createDueno(data);
  return data;
};

export const listDuenoById = async (id: number): Promise<Dueno.Dueno | null> => {
  return Dueno.getDuenoById(id);
};

export const UpdateDueno = async (id: number, data: Partial<DuenoData>): Promise<DuenoData[]> => {
  await Dueno.updateDueno(id, data);
  return Dueno.getAllDuenos();
};

export const DelDueno = async (id: number): Promise<Dueno.Dueno[]> => {
  await Dueno.deleteDueno(id);
  return Dueno.getAllDuenos();
};