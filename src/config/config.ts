import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () => ({
  DB: {
    type: 'mysql',
    host: process.env.ENV_MODE === 'local' ? 'localhost' : process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      __dirname + '/../domain/**/*.entity.{js,ts}',
      __dirname + '/../domain/**/entity/*.entity.{js,ts}',
    ],
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
  },
  NEST: {
    PORT: process.env.BACKEND_PORT,
    HOST:
      process.env.MODE_ENV === 'local'
        ? 'localhost'
        : process.env.BACKEND_HOSTNAME,
  },
  databaseConfig,
  openAIConfig,
});

export const databaseConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE === 'mariadb' ? 'mariadb' : 'mysql',
  host: 'localhost',
  // process.env.REACT_APP_ENV === 'local' ? 'localhost' : process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
  autoLoadEntities: true,
  logging: true,
  // entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  // entities: [Photo, Reservation,],
};

export const openAIConfig = process.env.OPEN_API_KEY;