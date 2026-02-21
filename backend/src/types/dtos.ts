export interface UsuarioData {
 username: string;
  email: string;
  password: string;
  role: 'user'
}

export interface MascotaData {
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
}

export interface DuenoData {
   name: string;
  lastname: string;
  adress: string;
  phone: string;
}