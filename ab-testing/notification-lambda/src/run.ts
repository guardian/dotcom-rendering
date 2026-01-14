#!/usr/bin/env node
/**
 * Run the lambda handler locally using frontend AWS account credentials
 *
 * Usage:
 *   node src/run.ts
 *
 * Prerequisites:
 *   - AWS credentials for the frontend account must be configured
 */

import { handler } from "./index.ts";

process.env.STAGE = `LOCAL`;
process.env.EMAIL_DOMAIN = `abtesting.code.dev-gutools.co.uk`;

console.debug(`Running lambda handler locally\n`);
console.debug(`EMAIL_DOMAIN=${process.env.EMAIL_DOMAIN}\n`);

void (async () => {
	try {
		await handler();
		console.log("\n✅ Lambda handler completed successfully");
		process.exit(0);
	} catch (error) {
		console.error("\n❌ Lambda handler failed:", error);
		process.exit(1);
	}
})();
