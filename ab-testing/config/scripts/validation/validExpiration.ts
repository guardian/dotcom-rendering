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

		/**
		 * Converts the expiration date to a `Date` object and then back into a string
		 * This is to confirm Javascript interprets the input the same way humans do
		 * If there's a difference, we throw an error to highlight the discrepancy
		 * @example `2026-02-30` is interpreted as `2026-03-02` so this fails
		 * @example `2026-01-30` is interpreted as `2026-01-30` so this passes
		 */
		const interpretedExpirationDate = new Date(test.expirationDate)
			.toISOString()
			.split("T")[0];

		if (test.expirationDate !== interpretedExpirationDate) {
			throw new Error(
				`Invalid expiration date provided on test ${test.name}: ${test.expirationDate}`,
			);
		}
	});
	return true;
}
