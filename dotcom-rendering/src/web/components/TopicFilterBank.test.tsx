import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { render, screen } from '@testing-library/react';
import { SingleKeyEvent } from '../../../fixtures/manual/live-blog-key-events';
import {
	hasRelevantTopics,
	TopicFilterBank,
} from './TopicFilterBank.importable';

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

describe('TopicFilterBank', () => {
	const renderTopicFilterBank = (
		keyEvents: Block[],
		availableTopics?: Topic[],
	) => {
		render(
			<TopicFilterBank
				availableTopics={availableTopics}
				keyEvents={keyEvents}
				selectedTopics={[]}
				format={{
					theme: ArticlePillar.Lifestyle,
					design: ArticleDesign.Interactive,
					display: ArticleDisplay.Immersive,
				}}
				filterKeyEvents={false}
				id="key-events-carousel-desktop"
			/>,
		);
	};

	it('It renders a button for Key Events', () => {
		renderTopicFilterBank(SingleKeyEvent, []);
		expect(screen.getByText('Filters')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: 'Activate Key events filter' }),
		).toBeInTheDocument();
	});

	it('It should render a button for each topic with count greater than 2', () => {
		renderTopicFilterBank(
			[],
			[
				{ type: 'PERSON', value: 'Liz Truss', count: 3 },
				{ type: 'PERSON', value: 'Iain Duncan Smith', count: 2 },
			],
		);

		expect(screen.getByText('Filters')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: 'Activate Liz Truss filter' }),
		).toBeInTheDocument();
		expect(
			screen.queryByRole('button', {
				name: 'Activate Iain Duncan Smith filter',
			}),
		).not.toBeInTheDocument();
	});

	it('It should not show filters when there are no relevant topics or key events', () => {
		renderTopicFilterBank(
			[],
			[{ type: 'PERSON', value: 'Iain Duncan Smith', count: 2 }],
		);
		expect(screen.queryByText('Filters')).not.toBeInTheDocument();
	});
});
