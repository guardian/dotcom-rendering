// @ts-check

/** This is a mock logger to replace [logging.ts][]
 *
 * [logging.ts]: ../../src/server/lib/logging.ts
 *
 * @type {Partial<import("log4js").Logger>}
 */
export const logger = {
	log: console.log,
	warn: console.warn,
	debug: console.debug,
};
