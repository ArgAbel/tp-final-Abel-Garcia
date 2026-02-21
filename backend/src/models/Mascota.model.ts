 import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export interface Mascota {
  id: number;
  name: string;
  race: string;
  b_date: Date;
  dueno_id: number;
}

export type MascotaRow = Mascota& RowDataPacket;

export const getAllMascotas = async (): Promise<Mascota[]> => {
  const [rows] = await pool.query<MascotaRow[]>(`
    SELECT m.id, m.name, m.race, m.b_date, m.dueno_id
    FROM Mascota m
    WHERE m.activo = 1
    `);
  return rows;
};

export const createMascota = async (data: Mascota): Promise<void> => {
  const { name, race, b_date, dueno_id } = data;

  await pool.query(
    'INSERT INTO Mascota (name, race, b_date, dueno_id) VALUES (?, ?, ?, ?)',
    [name, race, b_date, dueno_id]
  );
};

export const getMascotaById = async (id: number): Promise<Mascota | null> => {
  const [rows] = await pool.query<MascotaRow[]>(
    'SELECT id, name, race, b_date, dueno_id FROM Mascota WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

export const updateMascota = async (id: number, data: Partial<Mascota>): Promise<void> => {
  const { name, race, b_date, dueno_id } = data;
  await pool.query(
    'UPDATE Mascota SET name = ?, race = ?, b_date = ?, dueno_id = ? WHERE id = ?',
    [name, race, b_date, dueno_id, id]
  );
};  

export const deleteMascota = async (id: number): Promise<void> => {
  await pool.query('UPDATE Mascota SET activo = 0 WHERE id = ?', [id]);

  };