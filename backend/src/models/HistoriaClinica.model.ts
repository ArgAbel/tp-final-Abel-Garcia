import pool from "../config/database";
import { RowDataPacket } from "mysql2";

export interface Hclinico {
  id: number;
  text: string;
  user_id: string;
  mascotaid: string;
  phone: string;
}

export type HclinicoRow = Hclinico & RowDataPacket;

export const getAllHclinicos = async (): Promise<Hclinico[]> => {
  const [rows] = await pool.query<HclinicoRow[]>(`
    SELECT h.id, h.text, h.user_id, h.mascota_id
    FROM historial_clinico h
    WHERE h.activo = 1
    `);
  return rows;
};

export const createHclinico = async (data: Hclinico): Promise<number> => {
  const { text, user_id, mascotaid } = data;

  const [result]: any = await pool.query(
    "INSERT INTO historial_clinico (text, user_id, mascota_id) VALUES (?, ?, ?)",
    [text, user_id, mascotaid],
  );
  return result.insertId;
};

export const getHclinicoById = async (id: number): Promise<Hclinico | null> => {
  const [rows] = await pool.query<HclinicoRow[]>(
    "SELECT id, text, user_id, mascota_id FROM historial_clinico WHERE id = ?",
    [id],
  );
  return rows.length > 0 ? rows[0] : null;
};

export const updateHclinico = async (
  id: number,
  data: Partial<Hclinico>,
): Promise<void> => {
  const { text, user_id, mascotaid } = data;
  await pool.query(
    "UPDATE historial_clinico SET text = ?, user_id = ?, mascota_id = ? WHERE id = ?",
    [text, user_id, mascotaid, id],
  );
};

export const deleteHclinico = async (id: number): Promise<void> => {
  await pool.query("UPDATE historial_clinico SET activo = 0 WHERE id = ?", [
    id,
  ]);
};
