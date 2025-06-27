import { ABTest } from '../../types.ts';

function failureReason(expiresInFuture: boolean, isNotAWeekend: boolean) {
	if (!expiresInFuture) {
		return 'date is in the past';
	}
	if (!isNotAWeekend) {
		return 'date is at the weekend';
	}
}

export function allExpirationsValid(tests: ABTest[]): boolean {
	return tests.every((test) => {
		const expires = test.expirationDate;
		const now = new Date();
		const isNotAWeekend = expires.getDay() !== 0 && expires.getDay() !== 6;

		if (expires > now && isNotAWeekend) {
			return true;
		}

		const errorReason = failureReason(expires > now, isNotAWeekend);

		throw new Error(
			`${test.name} has an invalid expiration date: ${errorReason}`,
		);
	});
}
