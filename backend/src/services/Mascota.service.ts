import * as Mascota from '../models/Mascota.model';

export const listMascota = async (): Promise<Mascota.Mascota[]> => {
  return Mascota.getAllMascotas();
};

export const CreateNewMascota = async (data: Mascota.Mascota): Promise<Mascota.Mascota> => {
  await Mascota.createMascota(data);
  return data;
};

export const listMascotaById = async (id: number): Promise<Mascota.Mascota | null> => {
  return Mascota.getMascotaById(id);
};

export const UpdateMascota = async (id: number, data: Partial<Mascota.Mascota>): Promise<Mascota.Mascota[]> => {
  await Mascota.updateMascota(id, data);
  return Mascota.getAllMascotas();
};

export const DelMascota = async (id: number): Promise<Mascota.Mascota[]> => {
  await Mascota.deleteMascota(id);
  return Mascota.getAllMascotas();
};