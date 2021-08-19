import type { LoggerFunctions } from '../LoggerFunctions';

class ClientProdLogger implements LoggerFunctions {
	// eslint-disable-next-line @typescript-eslint/no-empty-function -- To be implemented
	debug(message: string): void {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function -- To be implemented
	info(message: string): void {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function -- To be implemented
	warn(message: string, error?: Error): void {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function -- To be implemented
	error(message: string, error?: Error): void {}
}

export const logger: LoggerFunctions = new ClientProdLogger();
