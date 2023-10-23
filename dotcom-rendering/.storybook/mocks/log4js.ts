import type { Logger } from 'log4js';

/**
 * This is a mock logger to replace [logging.ts][]
 *
 * [logging.ts]: ../../src/server/lib/logging.ts
 */
export const logger: Partial<Logger> = {
	log: console.log,
	warn: console.warn,
	debug: console.debug,
};
