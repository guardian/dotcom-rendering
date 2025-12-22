import type { ABTest } from "../../types.ts";

export function allExpirationsValid(tests: ABTest[]): boolean {
	tests.forEach((test) => {
		const expires = new Date(test.expirationDate);
		const now = new Date();

		if (expires < now) {
			console.warn(
				`${
					test.name
				} has an expiration date in the past: ${expires.toISOString()}, has it expired?`,
			);
		}
	});
	return true;
}
