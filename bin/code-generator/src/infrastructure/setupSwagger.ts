import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService);
  const documentBuilder = new DocumentBuilder()
    .setTitle('NestJS Archetype API')
    .setDescription('Starwars characters demo')
    .setVersion('1.0.0');

  const baseUrl = configService.get<string>('BASE_URL', '');

  documentBuilder.addServer(baseUrl);

  const config = documentBuilder.build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}
