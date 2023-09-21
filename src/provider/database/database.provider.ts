import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
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
