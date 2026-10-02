import { formatScorerOtherInfo } from './footballMatchV2';

describe('formatScorerOtherInfo', () => {
	it('reformats goal in added time correctly', () => {
		const result = formatScorerOtherInfo('+9:42');
		expect(result).toEqual('+10');
	});

	it('reformats goal in added time with own goal  detail correctly', () => {
		const result = formatScorerOtherInfo('+9:42 o.g.');
		expect(result).toEqual('+10 o.g.');
	});

	it('reformats goal in added time with penalty detail correctly', () => {
		const result = formatScorerOtherInfo('+9:42 Pen');
		expect(result).toEqual('+10 Pen');
	});
	it('returns non added time info as is', () => {
		const result = formatScorerOtherInfo('Pen');
		expect(result).toEqual('Pen');
	});
});
