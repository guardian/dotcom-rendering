import type { FootballMatch } from '../../footballMatchV2';
import { notificationDisplayName } from './Notifications';

const matchFixture = {
	kind: 'Fixture',
	kickOff: new Date('2025-11-20T20:30:00Z'),
	venue: 'Old Trafford',
	homeTeam: {
		name: 'Wolverhampton Wanderers',
		paID: '44',
	},
	awayTeam: {
		name: 'Belgium',
		paID: '997',
	},
	paId: 'matchId',
} satisfies FootballMatch;

describe('notificationDisplayName', () => {
	it('puts the home team first, the away team second, and uses a UK date format', () => {
		const displayName = notificationDisplayName('UK')(matchFixture);

		expect(displayName).toEqual(
			'Wolverhampton Wanderers vs Belgium (20/11/2025, GMT)',
		);
	});

	it('puts the home team first, the away team second, and uses the correct day and date format for AU', () => {
		const displayName = notificationDisplayName('AU')(matchFixture);

		expect(displayName).toEqual(
			'Wolverhampton Wanderers vs Belgium (21/11/2025, AEDT)',
		);
	});

	it('puts the home team first, the away team second, and uses a US date format', () => {
		const displayName = notificationDisplayName('US')(matchFixture);

		expect(displayName).toEqual(
			'Wolverhampton Wanderers vs Belgium (11/20/2025, EST)',
		);
	});
});
