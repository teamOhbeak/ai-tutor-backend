import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource(
        configService.get<DataSourceOptions>('DB'),
      );
      dataSource.initialize()
      .then(() => {
        console.log(`DB initialized`);
      })
      .catch((reason: any) => {
        console.log(`DB initialization failed
        \nreason: ${JSON.stringify(reason)}`);
      });
      return dataSource;
    },
  },
];
