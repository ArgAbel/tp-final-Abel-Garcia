import * as HistoriaClinica from '../models/HistoriaClinica.model';
import { Hclinico } from '../models/HistoriaClinica.model';


export const listHclinica = async (): Promise<Hclinico[]> => {
  return HistoriaClinica.getAllHclinicos();
};

export const CreateNewHclinica = async (data: Hclinico): Promise<Hclinico> => {
  const id = await HistoriaClinica.createHclinico(data);
  return { ...data, id };
};

export const listHclinicaById = async (id: number): Promise<Hclinico | null> => {
  return HistoriaClinica.getHclinicoById(id);
};

export const UpdateHclinica = async (id: number, data: Partial<Hclinico>): Promise<Hclinico[]> => {
  await HistoriaClinica.updateHclinico(id, data);
  return HistoriaClinica.getAllHclinicos();
};

export const DelHclinica = async (id: number): Promise<Hclinico[]> => {
  await HistoriaClinica.deleteHclinico(id);
  return HistoriaClinica.getAllHclinicos();
};