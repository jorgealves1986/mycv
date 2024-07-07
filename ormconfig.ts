import { DataSource, DataSourceOptions } from 'typeorm';

let dbOptions: DataSourceOptions = {
  type: 'sqlite',
  database: '',
  entities: [],
  migrations: ['dist/migrations/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbOptions, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      synchronize: true,
    });
    break;
  case 'test':
    Object.assign(dbOptions, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrations: ['migrations/*.ts'],
      synchronize: true,
    });
    break;
  case 'production':
    Object.assign(dbOptions, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unknown environment');
}

export const dataSourceOptions: DataSourceOptions = dbOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
