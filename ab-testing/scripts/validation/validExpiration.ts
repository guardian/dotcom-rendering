import type { ABTest } from "../../types.ts";

export function allExpirationsValid(tests: ABTest[]): boolean {
	tests.forEach((test) => {
		const expires = new Date(test.expirationDate);
		const now = new Date();

		if (expires < now) {
			throw new Error(
				`${
					test.name
				} has an expiration date in the past: ${expires.toISOString()}, has it expired? If it doesn't belong to you or your team, you can set the status to OFF for now.`,
			);
		}
	});
	return true;
}
