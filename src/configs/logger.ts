import 'winston-daily-rotate-file'

import chalk from 'chalk'
import winston from 'winston'

export class Logger {
	private readonly logger: winston.Logger

	constructor(context: string) {
		this.logger = winston.createLogger({
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.prettyPrint(),
						winston.format.printf((info) => {
							switch (info.level) {
								case 'info':
									return `[${chalk.green(info.level.toUpperCase())}] ${info.timestamp} :: [${chalk.yellowBright(context)}] ${chalk.green(info.message)}`
								case 'warn':
									return `[${chalk.yellow(info.level.toUpperCase())}] ${info.timestamp} :: [${chalk.yellowBright(context)}] ${chalk.yellow(info.message)}`
								case 'error':
									return `[${chalk.redBright(info.level.toUpperCase())}] ${info.timestamp} :: [${chalk.yellowBright(context)}] ${chalk.redBright(info.message)}`
								default:
									return `[${chalk.green(info.level.toUpperCase())}] ${info.timestamp} :: [${chalk.yellowBright(context)}] ${info.message}`
							}
						}),
					),
				}),
				new winston.transports.DailyRotateFile({
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.prettyPrint(),
						winston.format.printf((info) => {
							return `[${info.level.toUpperCase()}] ${info.timestamp} :: ${info.message}`
						}),
					),
					filename: 'logs/logger-%DATE%.log',
					datePattern: 'YYYY-MM-DD-HH',
					zippedArchive: true,
					maxSize: '5m',
				}),
			],
		})
	}

	/**
	 * Log a message with a level of "info".
	 *
	 * @param {string | null} [message] The message to log.
	 */
	info(message?: string | null): void {
		this.logger.info(message)
	}

	/**
	 * Log a message with a level of "warn".
	 *
	 * @param {string | null} [message] The message to log.
	 */
	warn(message?: string | null): void {
		this.logger.warn(message)
	}

	/**
	 * Log a message with a level of "error".
	 *
	 * @param {string | null} [message] The message to log.
	 */
	error(message?: string | null): void {
		this.logger.error(message)
	}

	/**
	 * Log a message with a level of "debug".
	 *
	 * @param {string | null} [message] The message to log.
	 */
	debug(message?: string | null): void {
		this.logger.debug(message)
	}
}
