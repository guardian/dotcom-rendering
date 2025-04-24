import { assertEquals } from 'jsr:@std/assert/equals';
import { allExpirationsValid } from './validExpiration.ts';
import { ABTest } from '../../types.ts';
import { assertThrows } from 'jsr:@std/assert/throws';

function futureWeekday() {
	const today = new Date();
	const dayOfWeek = today.getDay();

	// If the test is run on a Friday or Saturday, add three days to get a future weekday
	if (dayOfWeek >= 5) {
		const futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 3);
		return futureDate;
	}

	const futureDate = new Date();
	futureDate.setDate(futureDate.getDate() + 1);
	return futureDate;
}

function futureWeekend() {
	const today = new Date();
	const dayOfWeek = today.getDay();
	const daysToSaturday = 6 - dayOfWeek;

	const futureDate = new Date();
	futureDate.setDate(futureDate.getDate() + daysToSaturday);
	return futureDate;
}

function pastDay() {
	const pastDate = new Date();
	pastDate.setDate(pastDate.getDate() - 2);
	return pastDate;
}

Deno.test(
	'allExpirationsValid - passes when the expiration is in the future and on a week day',
	() => {
		const futureWeekdayTest: ABTest = {
			name: 'commercial-future',
			description: 'End on a weekday',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: futureWeekday(),
			type: 'client',
			highImpact: false,
			groups: [
				{ id: 'control', size: 5 / 100 },
				{ id: 'variant', size: 5 / 100 },
			],
		};

		assertEquals(allExpirationsValid([futureWeekdayTest]), true);
	},
);

Deno.test(
	'allExpirationsValid - throws when the expiration is in the future and on a weekend',
	() => {
		const futureWeekdayTest: ABTest = {
			name: 'commercial-future',
			description: 'End on a weekend',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: futureWeekend(),
			type: 'client',
			highImpact: false,
			groups: [
				{ id: 'control', size: 5 / 100 },
				{ id: 'variant', size: 5 / 100 },
			],
		};

		assertThrows(() => allExpirationsValid([futureWeekdayTest]));
	},
);

Deno.test(
	'allExpirationsValid - throws when the expiration is in the future and on a weekend',
	() => {
		const futureWeekdayTest: ABTest = {
			name: 'commercial-past',
			description: 'End in the past',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: pastDay(),
			type: 'client',
			highImpact: false,
			groups: [
				{ id: 'control', size: 5 / 100 },
				{ id: 'variant', size: 5 / 100 },
			],
		};

		assertThrows(() => allExpirationsValid([futureWeekdayTest]));
	},
);
