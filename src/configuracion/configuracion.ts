import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
  static get ambiente(): string {
    return process.env.AMBIENTE;
  }
  static readonly puerto = process.env.PORT;
  static readonly key = process.env.KEY;
  static readonly dbHost = process.env.DB_HOST;
  static readonly dbPuerto = Number(process.env.DB_PUERTO);
  static readonly dbUsuario = process.env.DB_USUARIO;
  static readonly dbContrasenna = process.env.DB_CONTRASENNA;
  static readonly dbBaseDatos = process.env.DB_BASE_DATOS;
}

