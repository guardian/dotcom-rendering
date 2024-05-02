export interface LoggerFunctions {
	debug(message: string): void;
	info(message: string): void;
	warn(message: string, error?: unknown): void;
	error(message: string, error?: unknown): void;
}
