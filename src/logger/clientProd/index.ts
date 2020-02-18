import {LoggerFunctions} from "../LoggerFunctions";

class ClientProdLogger implements LoggerFunctions {
    debug(message: string): void {
    }

    info(message: string): void {
    }

    warn(message: string, error?: Error): void {
    }

    error(message: string, error?: Error): void {
    }
}

export const logger: LoggerFunctions = new ClientProdLogger();