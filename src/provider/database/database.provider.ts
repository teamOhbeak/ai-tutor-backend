import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      // <<<<<<< HEAD
      //       const dataSource = new DataSource(
      //         configService.get<DataSourceOptions>('DB'),
      //       );
      //       dataSource
      //         .initialize()
      //         .then(() => {
      //           console.log(`DB initialized`);
      //         })
      //         .catch((reason: any) => {
      //           console.log(`DB initialization failed
      //         \nreason: ${JSON.stringify(reason)}`);
      //         });
      // =======
      console.log(`mode: ${process.env.MODE_ENV}`);
      console.log(`host: ${process.env.DB_HOST}`);
      const dataSourceOption = configService.get<DataSourceOptions>('DB');
      console.log(`dataSourceOption: ${JSON.stringify(dataSourceOption)}`);
      const dataSource = new DataSource(dataSourceOption);
      dataSource.initialize();

      return dataSource;
    },
  },
];
