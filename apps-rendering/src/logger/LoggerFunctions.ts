export interface LoggerFunctions {
	debug(message: string): void;
	info(message: string): void;
	warn(message: string, error?: Error | unknown): void;
	error(message: string, error?: Error | unknown): void;
}
