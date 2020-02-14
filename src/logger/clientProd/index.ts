import {ILogger} from "../ILogger";

class ClientProdLogger implements ILogger {
    debug(message: string): void {
    }

    info(message: string): void {
    }

    warn(message: string, error?: Error): void {
    }

    error(message: string, error?: Error): void {
    }
}

export const logger: ILogger = new ClientProdLogger();