import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { DateTime } from 'luxon';

const dateNow = DateTime.now().setZone('Asia/Seoul');

export async function swaggerSetting(app) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CHAT API')
    .setDescription(
      `
          마지막 업데이트 : ${dateNow.toFormat('yyyy-MM-dd HH:mm:ss')}
          `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'AI tutor API',
  };
  SwaggerModule.setup('/swagger', app, document, customOptions);
}
