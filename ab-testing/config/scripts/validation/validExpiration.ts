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
		 * Check if the input date matches the JS interpreted date to check it is valid
		 * If the input !== output date, we throw an error to highlight the date set is not
		 * the actual expiration date of the test
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
