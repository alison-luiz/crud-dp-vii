import {
	utilities as nestWinstonModuleUtilities,
	WinstonModuleOptions
} from 'nest-winston'
import * as winston from 'winston'
import { ENV } from './environment'

export const winstonConfig: WinstonModuleOptions = {
	levels: winston.config.npm.levels,
	level: ENV === 'development' ? 'debug' : 'info',
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.splat(),
				nestWinstonModuleUtilities.format.nestLike()
			)
		}),
		new winston.transports.File({
			level: 'error',
			filename: 'application.log',
			dirname: 'logs'
		})
	]
}

export const logger = winston.createLogger(winstonConfig)
