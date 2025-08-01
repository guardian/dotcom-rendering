import { ABTest } from '../../types.ts';

export function allExpirationsValid(tests: ABTest[]): boolean {
	return tests.every((test) => {
		const expires = test.expirationDate;
		const now = new Date();

		if (expires > now) {
			return true;
		}

		throw new Error(
			`${
				test.name
			} has an an expiration date in the past: ${expires.toISOString()}, has it expired?`,
		);
	});
}
