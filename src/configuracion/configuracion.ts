import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
  static get ambiente(): string {
    return process.env.AMBIENTE;
  }
  static readonly puerto = process.env.PORT;
  static readonly key = `${process.env.KEY}`;
  static readonly dbHost = `${process.env.DATABASE_HOST}`;
  static readonly dbPuerto = Number(process.env.DATABASE_PORT);
  static readonly dbUsuario = `${process.env.DATABASE_USER}`;
  static readonly dbContrasenna = `${process.env.DATABASE_PASSWORD}`;
  static readonly dbBaseDatos = `${process.env.DATABASE_NAME}`;
}
