import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth';
import { AppError } from '../types/appErrors';
import { rolePermissionsMap } from '../config/permissionStore';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  console.log('Token recibido en authenticate:', token);

  if (!token) {
    return next(new AppError('No token provided', 401));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(err); // delegar a errorHandler (JsonWebTokenError / TokenExpiredError)
    }
    req.user = decoded as JwtPayload;
    next();
  });
};



export const authorize = (...requiredAuthorities: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Extraemos el rol del usuario (inyectado previamente en el login/auth middleware)
    const userRole = req.user?.role; 

   if (!userRole) {
      return res.status(401).json({ message: 'Usuario no identificado o sin rol' });
    }

    // 2. Obtenemos los permisos asociados a ese rol desde la memoria
    const permissionsForRole = rolePermissionsMap[userRole] || [];
console.log('--- DEBUG AUTHORIZE ---');
    console.log('Rol del usuario:', userRole);
    console.log('Permisos en memoria para este rol:', permissionsForRole);
    console.log('Autoridades requeridas por la ruta:', requiredAuthorities);
    // 3. Verificamos si alguna de las combinaciones requeridas coincide con el usuario actual
   const hasAccess = requiredAuthorities.some(authority => {
      const [roleName, permissionName] = authority.split(':');

    // El rol del usuario debe coincidir con el rol requerido
      // Y ese rol debe tener asignado el permiso en el mapa de memoria
      return userRole === roleName && permissionsForRole.includes(permissionName);
    });

    if (!hasAccess) {
      return res.status(403).json({ 
        message: `Acceso denegado: Tu rol '${userRole}' no tiene la autorización específica requerida.` 
      });
    }

    next();
  };
};