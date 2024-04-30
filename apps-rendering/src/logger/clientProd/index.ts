import type { LoggerFunctions } from '../LoggerFunctions';

class ClientProdLogger implements LoggerFunctions {
	debug(message: string): void {}

	info(message: string): void {}

	warn(message: string, error?: Error | unknown): void {}

	error(message: string, error?: Error | unknown): void {}
}

export const logger: LoggerFunctions = new ClientProdLogger();
