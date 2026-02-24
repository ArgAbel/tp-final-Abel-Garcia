import pool from "../config/database";
import { RowDataPacket } from "mysql2";
import { DuenoData } from "../types/dtos";

export interface Dueno {
  id: number;
  name: string;
  lastname: string;
  adress: string;
  phone: string;
}

export type DuenoRow = Dueno & RowDataPacket;

export const getAllDuenos = async (): Promise<Dueno[]> => {
  const [rows] = await pool.query<DuenoRow[]>(`
    SELECT d.id, d.name, d.lastname, d.adress, d.phone
    FROM Dueno d
    WHERE d.activo = 1
    `);
  return rows;
};

export const createDueno = async (DuenoData: DuenoData): Promise<void> => {
  const { name, lastname, adress, phone } = DuenoData;

  await pool.query(
    "INSERT INTO Dueno (name, lastname, adress, phone) VALUES (?, ?, ?, ?)",
    [name, lastname, adress, phone],
  );
};

export const getDuenoById = async (id: number): Promise<Dueno | null> => {
  const [rows] = await pool.query<DuenoRow[]>(
    "SELECT id, name, lastname, adress, phone FROM Dueno WHERE id = ?",
    [id],
  );
  return rows.length > 0 ? rows[0] : null;
};

export const updateDueno = async (
  id: number,
  data: Partial<Dueno>,
): Promise<void> => {
  const { name, lastname, adress, phone } = data;
  await pool.query(
    "UPDATE Dueno SET name = ?, lastname = ?, adress = ?, phone = ? WHERE id = ?",
    [name, lastname, adress, phone, id],
  );
};

export const deleteDueno = async (id: number): Promise<void> => {
  await pool.query("UPDATE Dueno SET activo = 0 WHERE id = ?", [id]);
};
