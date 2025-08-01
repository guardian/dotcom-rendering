import { assertEquals } from 'jsr:@std/assert/equals';
import { allExpirationsValid } from './validExpiration.ts';
import { ABTest } from '../../types.ts';
import { assertThrows } from 'jsr:@std/assert/throws';

function futureDay() {
	const today = new Date();
	today.setDate(today.getDate() + 1);
	return today;
}

function pastDay() {
	const pastDate = new Date();
	pastDate.setDate(pastDate.getDate() - 2);
	return pastDate;
}

Deno.test(
	'allExpirationsValid - passes when the expiration is in the future',
	() => {
		const futureDayTest: ABTest = {
			name: 'commercial-future',
			description: 'End on a weekday',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: futureDay(),
			type: 'client',
			audienceSize: 10 / 100,
			groups: ['control', 'variant'],
		};

		assertEquals(allExpirationsValid([futureDayTest]), true);
	},
);

Deno.test(
	'allExpirationsValid - throws when the expiration is in the past',
	() => {
		const pastTest: ABTest = {
			name: 'commercial-past',
			description: 'End in the past',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: pastDay(),
			type: 'client',
			audienceSize: 10 / 100,
			groups: ['control', 'variant'],
		};

		assertThrows(() => allExpirationsValid([pastTest]));
	},
);
