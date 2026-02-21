import { body } from 'express-validator';
import { ValidationChain } from 'express-validator';


export const validateEmail: ValidationChain[] = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
];
const username: ValidationChain[] = [
  body('username')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio')
    .isString()
    .withMessage('El nombre de usuario debe ser una cadena de texto')
    .isLength({ max: 50, min: 3 })
    .withMessage(
      'El nombre de usuario debe tener entre 3 y 50 caracteres',
    ),
];



export const getUsuarioByIdValidator: ValidationChain[] = [
  body('id')
    .isUUID()
    .withMessage('El ID debe ser un UUID válido'),
];

export const creatUsuarioValidator: ValidationChain[] = [
  ...username,
  ...validateEmail,
];

export const updateUsuarioValidator: ValidationChain[] = [
  ...username,
  ...validateEmail,
];

export const removeUsuarioValidator: ValidationChain[] = [
  body('id')
    .isUUID()
    .withMessage('El ID debe ser un UUID válido'),
];
