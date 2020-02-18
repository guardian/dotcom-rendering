import {LoggerFunctions} from "../LoggerFunctions";

class ClientProdLogger implements LoggerFunctions {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    debug(message: string): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    info(message: string): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    warn(message: string, error?: Error): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error(message: string, error?: Error): void {
    }
}

export const logger: LoggerFunctions = new ClientProdLogger();