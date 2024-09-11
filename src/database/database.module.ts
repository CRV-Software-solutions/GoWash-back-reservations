import { Config } from './../configuracion/configuracion';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Constantes } from './../utils/constantes';

export const models = [];
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: Config.dbHost,
      port: Config.dbPuerto,
      username: Config.dbUsuario,
      password: Config.dbContrasenna,
      database: Config.dbBaseDatos,
      models: models,
      autoLoadModels: true,
      synchronize: true,
      logging: Config.ambiente === Constantes.LOCAL,
      sync: { alter: true }
    })
  ]
})
export class DatabaseModule {}
