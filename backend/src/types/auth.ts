export interface JwtPayload {
  //jsonwebtoken Payload personalizado
  id: string;
  userId: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
