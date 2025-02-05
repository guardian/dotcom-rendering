import type { FootballMatch } from '../footballMatches';
import { shouldRenderMatchLink } from './FootballMatchList';

it('should render match link if fixture is within 72 hours', () => {
	const match: FootballMatch = {
		paId: '',
		dateTime: new Date('2022-01-01T05:00:00Z'),
		kind: 'Fixture',
		homeTeam: 'Inter',
		awayTeam: 'Milan',
	};

	const now = new Date('2022-01-01T00:00:00Z');

	expect(shouldRenderMatchLink(match, now)).toBe(true);
});

it('should not render match link if fixture is more than 72 hours away', () => {
	const match: FootballMatch = {
		paId: '',
		dateTime: new Date('2022-01-04T00:00:01Z'),
		kind: 'Fixture',
		homeTeam: 'Inter',
		awayTeam: 'Milan',
	};

	const now = new Date('2022-01-01T00:00:00Z');

	expect(shouldRenderMatchLink(match, now)).toBe(false);
});
