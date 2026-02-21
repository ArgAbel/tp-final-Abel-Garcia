import { body } from 'express-validator';
import { ValidationChain } from 'express-validator';




export const validateEmail: ValidationChain[] = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
];
const Username: ValidationChain[] = [
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

export const password: ValidationChain[] = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),
];

export const registerValidators: ValidationChain[] = [
  ...Username,
  ...validateEmail,
  ...password,
  ];

export const loginValidators: ValidationChain[] = [
  ...validateEmail,
  ...password,
];  