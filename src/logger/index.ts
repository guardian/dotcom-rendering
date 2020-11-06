import { logger as consoleLogger } from './clientDev';
import type { LoggerFunctions } from './LoggerFunctions';

// this is only here to please IntelliJ / VScode
export const logger: LoggerFunctions = consoleLogger;
