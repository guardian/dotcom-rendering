import { hasRelevantTopics } from './TopicFilterBank.importable';

describe('hasRelevantTopics', () => {
	describe('should be false', () => {
		it('when availableTopics is undefined', () => {
			expect(hasRelevantTopics(undefined)).toBe(false);
		});
		it('when availableTopics is empty', () => {
			expect(hasRelevantTopics([])).toBe(false);
		});
		it('when availableTopics has no topic with a count greater than 2', () => {
			expect(
				hasRelevantTopics([
					{ type: 'PERSON', value: 'Iain Duncan Smith', count: 2 },
					{ type: 'PERSON', value: 'Anne-Marie Trevelyan', count: 1 },
				]),
			).toBe(false);
		});
	});
	describe('should be true', () => {
		it('when availableTopics has a topic with a count greater than 2', () => {
			expect(
				hasRelevantTopics([
					{ type: 'PERSON', value: 'Liz Truss', count: 3 },
					{ type: 'PERSON', value: 'Iain Duncan Smith', count: 1 },
					{ type: 'PERSON', value: 'Anne-Marie Trevelyan', count: 1 },
				]),
			).toBe(true);
		});
	});
});
