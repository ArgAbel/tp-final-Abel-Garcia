import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/appErrors';
//nos ayuda a acceder con seguridad a propiedades especificas del error
type AnyError = Error & {
    statusCode?: number;
    status?: string;
    isOperational?: boolean;
    code?: number | string;
    keyValue?: Record<string, any>;
    errors?: Record<string, any>;
    name?: string;
    value?: any;
};
// apperror traduce errores de librerias extrenas a mensaje entendibles para el cliente

//traduce errores de librerias extrenas a mensaje entendibles para el cliente
const handleCastErrorDB = (error: AnyError) => {
    return new AppError(`ID inválido: ${error.message || error.value || ''}`, 400);
};
//traduce errores de librerias extrenas a mensaje entendibles para el cliente
const handleDuplicateFieldsDB = (error: AnyError) => {
    const value = error.keyValue ? Object.values(error.keyValue)[0] : '';
    return new AppError(`Valor duplicado: ${value}. Use otro valor.`, 400);
};
//appError distingue entre errores operacionales y envia un mensaje controlado y el error del codigo
const handleValidationErrorDB = (error: AnyError) => {
    const messages = error.errors ? Object.values(error.errors).map((el: any) => el.message).join('. ') : error.message;
    return new AppError(messages || 'Error de validación', 400);
};

const handleJWTError =  new AppError('Token inválido. Por favor inicie sesión de nuevo.', 401);
const handleJWTExpiredError =  new AppError('El token ha expirado. Por favor inicie sesión de nuevo.', 401);
const handleSyntaxError =  new AppError('JSON inválido en la petición.', 400);

//separa la logica de respuesta por entorno para evitar fuga de informacion
const sendErrorDev = (err: AnyError, res: Response) => {
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

//separa la logica de respuesta por entorno para evitar fuga de informacion
const sendErrorProd = (err: AnyError, res: Response) => {
    if (err.isOperational) {
        return res.status(err.statusCode!).json({
            status: err.status || 'error',
            message: err.message,
        });
    }

    // Para errores no esperados no exponer detalles en producción
    console.error('ERROR 💥:', err);
    return res.status(500).json({
        status: 'error',
        message: 'Algo salió mal en el servidor',
    });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error: AnyError = err;

    error.statusCode = error.statusCode || 500;
    error.status = error.status || (error.statusCode >= 500 ? 'error' : 'fail');

    const env = process.env.NODE_ENV || 'development';

    // Mapear errores conocidos a `AppError` (operacionales)
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    else if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    else if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    else if (error.name === 'JsonWebTokenError') error = handleJWTError;
    else if (error.name === 'TokenExpiredError') error = handleJWTExpiredError;
    else if (error instanceof SyntaxError && 'body' in error) error = handleSyntaxError;
    else if (error.name === 'MulterError') error = new AppError(error.message || 'Error en la subida de archivos', 400);

    if (env === 'development') {
        return sendErrorDev(error, res);
    }

    return sendErrorProd(error, res);
};
