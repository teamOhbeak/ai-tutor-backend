import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@/domain/user/entity/user.entity';
import { UserStatus } from '@/domain/user/entity/user-status.enum';

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
        .then((source: DataSource) => {
          console.log(`db initialized`);
        })
        .catch(() => {});

      return dataSource;
    },
  },
];
