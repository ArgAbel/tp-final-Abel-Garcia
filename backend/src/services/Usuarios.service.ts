import * as Usuario from '../models/Usuario.model';
import { UsuarioData } from '../types/dtos';

export const listUsuario = async (): Promise<Usuario.Usuario[]> => {
  return Usuario.getAllUsuarios();
};

export const CreateNewUsuario = async (data: UsuarioData): Promise<UsuarioData> => {
  await Usuario.createUsuario(data);
  return data;
};

export const listUsuarioById = async (id: number): Promise<Usuario.Usuario | null> => {
  return Usuario.getUsuarioById(id);
};

export const UpdatUsuario = async (id: number, data: Partial<Usuario.Usuario>): Promise<Usuario.Usuario[]> => {
  await Usuario.updateUsuario(id, data);
  return Usuario.getAllUsuarios();
};

export const DelUsuario = async (id: number): Promise<Usuario.Usuario[]> => {
  await Usuario.deleteUsuario(id);
  return Usuario.getAllUsuarios();
};