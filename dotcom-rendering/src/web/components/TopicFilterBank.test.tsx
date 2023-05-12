import {
	getTopFiveIncludingSelected,
	hasRelevantTopics,
} from './TopicFilterBank';

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

describe('getTopFiveIncludingSelected', () => {
	const availableTopics: Topic[] = [
		{ type: 'PERSON', value: 'test topic 1', count: 6 },
		{ type: 'PERSON', value: 'test topic 2', count: 5 },
		{ type: 'PERSON', value: 'test topic 3', count: 5 },
		{ type: 'PERSON', value: 'test topic 4', count: 4 },
		{ type: 'PERSON', value: 'test topic 5', count: 4 },
		{ type: 'PERSON', value: 'test topic 6', count: 3 },
	];
	describe('should return the top 5 topics with count over 2, including the selected topic', () => {
		it('given selected is not within top 5', () => {
			const selectedTopic: Topic = {
				type: 'PERSON',
				value: 'test topic 6',
				count: 3,
			};

			const res = getTopFiveIncludingSelected(
				selectedTopic,
				availableTopics,
			);

			const expected = [
				{ type: 'PERSON', value: 'test topic 1', count: 6 },
				{ type: 'PERSON', value: 'test topic 2', count: 5 },
				{ type: 'PERSON', value: 'test topic 3', count: 5 },
				{ type: 'PERSON', value: 'test topic 4', count: 4 },
				{ type: 'PERSON', value: 'test topic 6', count: 3 },
			];

			expect(res).toEqual(expected);
		});
		it('given selected topic is within top 5', () => {
			const selectedTopic: Topic = {
				type: 'PERSON',
				value: 'test topic 2',
				count: 5,
			};

			const res = getTopFiveIncludingSelected(
				selectedTopic,
				availableTopics,
			);

			const expected = [
				{ type: 'PERSON', value: 'test topic 1', count: 6 },
				{ type: 'PERSON', value: 'test topic 2', count: 5 },
				{ type: 'PERSON', value: 'test topic 3', count: 5 },
				{ type: 'PERSON', value: 'test topic 4', count: 4 },
				{ type: 'PERSON', value: 'test topic 5', count: 4 },
			];

			expect(res).toEqual(expected);
		});
		it('given less than 5 items have count over 2 and selected is within them', () => {
			const topics: Topic[] = [
				{ type: 'PERSON', value: 'test topic 1', count: 6 },
				{ type: 'PERSON', value: 'test topic 2', count: 5 },
				{ type: 'PERSON', value: 'test topic 3', count: 5 },
			];
			const selectedTopic: Topic = {
				type: 'PERSON',
				value: 'test topic 2',
				count: 5,
			};

			const res = getTopFiveIncludingSelected(selectedTopic, topics);

			const expected = [
				{ type: 'PERSON', value: 'test topic 1', count: 6 },
				{ type: 'PERSON', value: 'test topic 2', count: 5 },
				{ type: 'PERSON', value: 'test topic 3', count: 5 },
			];

			expect(res).toEqual(expected);
		});
	});

	describe('should return top 4 excluding the selected', () => {
		it('given selected does not match any of the topics', () => {
			const selectedTopic: Topic = {
				type: 'PERSON',
				value: 'random',
				count: 5,
			};
			const res = getTopFiveIncludingSelected(
				selectedTopic,
				availableTopics,
			);

			const expected = [
				{ type: 'PERSON', value: 'test topic 1', count: 6 },
				{ type: 'PERSON', value: 'test topic 2', count: 5 },
				{ type: 'PERSON', value: 'test topic 3', count: 5 },
				{ type: 'PERSON', value: 'test topic 4', count: 4 },
				{ type: 'PERSON', value: 'test topic 5', count: 4 },
			];

			expect(res).toEqual(expected);
		});
	});
});
