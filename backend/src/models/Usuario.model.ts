import pool from '../config/database';
import { RowDataPacket } from 'mysql2';
import { UsuarioData } from '../types/dtos';



export interface Usuario {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'user'
}
export type UsuarioRow = Usuario & RowDataPacket;

export const getAllUsuarios = async (): Promise<Usuario[]> => {
  const [rows] = await pool.query<UsuarioRow[]>(`
    SELECT u.id, u.username, u.email, u.password, u.role
    FROM Usuario u
    WHERE u.activo = 1
    `);
  return rows;
};

export const createUsuario = async (data: UsuarioData): Promise<number> => {
  const { username, email, password, role } = data;

  const [result]: any = await pool.query(
    'INSERT INTO Usuario (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, password, role]
  );
  return result.insertId;
};

export const getUsuarioById = async (id: number): Promise<Usuario | null> => {
  const [rows] = await pool.query<UsuarioRow[]>(
    'SELECT id, username, email, password, role FROM Usuario WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

export const updateUsuario = async (id: number, data: Partial<Usuario>): Promise<void> => {
  const { username, email, password, role } = data;
  await pool.query(
    'UPDATE Usuario SET username = ?, email = ?, password = ?, role = ? WHERE id = ?',
    [username, email, password, role, id]
  );
};  

export const deleteUsuario = async (id: number): Promise<void> => {
  await pool.query('UPDATE Usuario SET activo = 0 WHERE id = ?', [id]);

  };
