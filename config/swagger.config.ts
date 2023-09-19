import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export async function swaggerSetting(app) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('AI-TUTOR API')
    .setDescription(``)
    .setContact('Steve', 'https://diasm3.github.com', 'diasm2@gmail.com')
    .setVersion('0.0.1')
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
    customSiteTitle: '항해해커톤 팀오백 AI-Tutor',
  };
  SwaggerModule.setup('/swagger', app, document, customOptions);
}
