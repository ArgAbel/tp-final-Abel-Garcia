import bcrypt from "bcrypt";
import * as userModel from "../models/Usuario.model";
import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload, UserRole } from "../types/auth";
import { AppError } from "../types/appErrors";
import pool from "../config/database";
import { Usuario } from "../models/Usuario.model";
import { RowDataPacket } from "mysql2/typings/mysql/lib/protocol/packets/RowDataPacket";

export type UsuarioRow = Usuario & RowDataPacket;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no definido");
}
const secretKey: string = process.env.JWT_SECRET;

export const register = async (
  username: string,
  email: string,
  password: string,
): Promise<number> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.createUsuario({
    username,
    email,
    password: hashedPassword,
    role: "user",
  });
  return user;
};

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const invalidCredentialsError = new Error("Credenciales inválidas");
  const [rows] = await pool.query<userModel.UsuarioRow[]>(
    "SELECT * FROM Usuario WHERE email = ? LIMIT 1",
    [email],
  );
  const user = rows[0];
  if (!user) {
    throw new AppError("Credenciales inválidas", 401); // manejo personalizado de errores
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    (user as userModel.UsuarioRow).password,
  );

  const payload: JwtPayload = {
    id: String(user.id),
    userId: String(user.id),
    role: user.role as UserRole,
  };
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "1h",
    issuer: "Abel M Garcia",
  };
  return jwt.sign(payload, secretKey, options);
};
