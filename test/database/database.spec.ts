import { Test } from '@nestjs/testing';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';

import { models } from './../../src/database/database.module';
import { Config } from './../../src/configuracion/configuracion';

describe('Validando database', () => {
  let sequelizeInstance: Sequelize;

  beforeAll(async () => {
    sequelizeInstance = new Sequelize({
      dialect: 'postgres',
      host: Config.dbHost,
      port: Config.dbPuerto,
      username: Config.dbUsuario,
      password: Config.dbContrasenna,
      database: Config.dbBaseDatos,
      logging: false
    });

    await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: Config.dbHost,
          port: Config.dbPuerto,
          username: Config.dbUsuario,
          password: Config.dbContrasenna,
          database: Config.dbBaseDatos,
          logging: false,
          models
        })
      ],
      providers: [
        {
          provide: Sequelize,
          useValue: sequelizeInstance
        }
      ]
    }).compile();
  });

  describe('Validar modelos', () => {
    it('Validando modelos con atributos', async () => {
      const errores = [];
      for (const model of models as any[]) {
        const attributes = Object.keys(model.rawAttributes);
        try {
          await model.findOne({ attributes });
        } catch (error) {
          errores.push({
            model: model.getTableName(),
            message: error.parent.sqlMessage || error.toString(),
            sql: error.sql
          });
        }
      }
      expect(errores).toEqual([]);
    }, 60000);

    it('Validando modelos y atributos con tablas y campos', async () => {
      const errores = [];
      for (const model of models as any[]) {
        let attribuetesTable = [];
        const tableName = model.getTableName();
        const attributes = model.getAttributes();
        let fieldsTable = Object.keys(attributes).map(
          key => attributes[key].field
        );
        const sql = `SHOW COLUMNS FROM \`${tableName}\`;`;
        const response = await sequelizeInstance.query(sql);
        response.forEach(field => {
          Object.keys(field).forEach(keys => {
            attribuetesTable.push(field[keys].Field);
          });
        });
        attribuetesTable = attribuetesTable.sort();
        fieldsTable = fieldsTable.sort();
        const attributesSet = new Set(attribuetesTable);
        const fieldsSet = new Set(fieldsTable);

        const attributesSetDifference = new Set(
          [...attributesSet].filter(x => !fieldsSet.has(x))
        );
        const fieldsSetDifference = new Set(
          [...fieldsSet].filter(x => !attributesSet.has(x))
        );

        if (attributesSetDifference.size > 0 || fieldsSetDifference.size > 0) {
          errores.push({
            modelo: model.name,
            tabla: tableName,
            camposTabla: attributesSetDifference,
            camposModelo: fieldsSetDifference
          });
        }
      }
      expect(errores).toEqual([]);
    }, 60000);
  });
});
