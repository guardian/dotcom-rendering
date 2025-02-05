import { shouldRenderMatchLink } from './FootballMatchList';

it('should render match link if fixture is within 72 hours', () => {
	const matchDateTime = new Date('2022-01-01T05:00:00Z');
	const now = new Date('2022-01-01T00:00:00Z');

	expect(shouldRenderMatchLink(matchDateTime, now)).toBe(true);
});

it('should not render match link if fixture is more than 72 hours away', () => {
	const matchDateTime = new Date('2022-01-04T00:00:01Z');
	const now = new Date('2022-01-01T00:00:00Z');

	expect(shouldRenderMatchLink(matchDateTime, now)).toBe(false);
});
