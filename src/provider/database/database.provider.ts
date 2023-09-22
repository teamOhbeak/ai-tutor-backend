import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSourceOption = configService.get<DataSourceOptions>('DB');
      console.log(`dataSourceOption: ${JSON.stringify(dataSourceOption)}`);
      const dataSource = new DataSource(dataSourceOption);

      dataSource
        .initialize()
        .then((source: DataSource) => {})
        .catch(() => {});
      dataSource
        .initialize()
        .then((source: DataSource) => {
          console.log(source);
          console.log(`db initialized`);
        })
        .catch((reason: any) => {
          console.log(reason);
          console.log(`db connection failed: ${JSON.stringify(reason)}`);
        });
      return dataSource;
    },
  },
];
