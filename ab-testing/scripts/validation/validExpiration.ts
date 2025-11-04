import { ABTest } from '../../types.ts';

export function allExpirationsValid(tests: ABTest[]): boolean {
	return tests.every((test) => {
		const expires = new Date(test.expirationDate);
		const now = new Date();

		if (expires > now) {
			return true;
		}

		throw new Error(
			`${
				test.name
			} has an expiration date in the past: ${expires.toISOString()}, has it expired? If it doesn't belong to you or your team, you can set the status to OFF for now.`,
		);
	});
}
