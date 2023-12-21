import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const logger = new Logger()
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    app.useGlobalPipes(new ValidationPipe())

    const swaggerConfig = new DocumentBuilder()
        .setTitle('API with NestJS')
        .setDescription('API developed throughout the API with NestJS course')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api', app, document)
    app.setGlobalPrefix('api')

    const port = configService.get('PORT') ?? 3000

    await app.listen(port)
    logger.log(`==========================================================`)

    logger.log(`Environment Variable`, 'NestApplication')

    logger.log(`==========================================================`)

    logger.log(
        `Http Server running on ${await app.getUrl()}`,
        'NestApplication'
    )
    logger.log(`Database uri connect success`, 'NestApplication')

    logger.log(`==========================================================`)
}
bootstrap()
