import type { LoggerFunctions } from '../LoggerFunctions';

class ClientDevLogger implements LoggerFunctions {
	debug(message: string): void {
		console.debug(message);
	}

	info(message: string): void {
		console.info(message);
	}

	warn(message: string, error?: Error): void {
		console.warn(message, error);
	}

	error(message: string, error?: Error): void {
		console.error(message, error);
	}
}

export const logger: LoggerFunctions = new ClientDevLogger();
