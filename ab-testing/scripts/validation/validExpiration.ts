import { ABTest } from '../../types.ts';

export function allExpirationsValid(tests: ABTest[]): boolean {
	return tests.every((test) => {
		const expires = test.expirationDate;
		const now = new Date();
		const isNotAWeekend = expires.getDay() !== 0 && expires.getDay() !== 6;

		if (expires > now && isNotAWeekend) {
			return true;
		}

		throw new Error(`${test.name} has an invalid expiration date`);
	});
}
