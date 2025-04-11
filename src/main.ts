import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DatabaseService } from './shared/database/database.service'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			forbidUnknownValues: true,
			transform: true
		})
	)
	app.enableCors()

	const swaggerConfig = new DocumentBuilder()
		.setTitle('CRUD - DP VII')
		.setDescription(
			'API para gerenciamento de personagens e itens mágicos de um jogo de RPG'
		)
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api', app, document)

	const databaseService = app.get(DatabaseService)
	await databaseService.synchronizeAndRunMigrations()

	await app.listen(3000)
}
bootstrap()
