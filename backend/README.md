# tp-back-end-Abel-Miguel-Garcia

Back end para veterinaria patitas felices con node JS y express

Instalacion de dependencias a utilizar:
npm install express
npm install -D typescript ts-node-dev @types/node @types/express --solo para desarrollo
npm install express mongoose bcrypt jsonwebtoken express-validator dotenv
npm install jsonwebtoken bcrypt express-validator express-rate-limit--dependencias para bcrypt
npm install -D @types/jsonwebtoken @types/bcrypt -- y jwt
agregamos comando start, build y dev en script de package.json

manejo de erroes centralizados a traver del middleware error.middleware.ts que captura errores enviados atravez de next(err)

modelo para servicio de varias veterinarias que en esta parte del proyecto incluye logear y crear veterinarios.

incluye archivo insomnia para comprobacion de rutas
