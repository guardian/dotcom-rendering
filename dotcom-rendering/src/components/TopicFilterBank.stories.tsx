import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { TopicFilterBank } from './TopicFilterBank';

const availableTopics: Topic[] = [
	{ type: 'GPE', value: 'London', count: 16 },
	{ type: 'ORG', value: 'RMT', count: 10 },
	{ type: 'PERSON', value: 'Boris Johnson', count: 10 },
	{ type: 'PERSON', value: 'Grant Shapps', count: 7 },
	{ type: 'PERSON', value: 'Keir Starmer', count: 7 },
	{ type: 'ORG', value: 'Network Rail', count: 6 },
	{ type: 'ORG', value: 'Guardian', count: 5 },
	{ type: 'GPE', value: 'Manchester', count: 4 },
	{ type: 'GPE', value: 'United Kingdom', count: 4 },
	{ type: 'PERSON', value: 'Anas Sarwar', count: 4 },
	{ type: 'PERSON', value: 'Cameron', count: 2 },
];

const availableTopicsWithLowerCount: Topic[] = [
	{ type: 'GPE', value: 'Manchester', count: 4 },
	{ type: 'GPE', value: 'United Kingdom', count: 3 },
	{ type: 'PERSON', value: 'Anas Sarwar', count: 2 },
	{ type: 'PERSON', value: 'Cameron', count: 1 },
];

const onlyAvailableTopicsWithLowCount: Topic[] = [
	{ type: 'PERSON', value: 'Iain Duncan Smith', count: 2 },
];

const selectedTopics: Topic[] = [{ type: 'GPE', value: 'United Kingdom' }];

const format = {
	theme: Pillar.News,
	design: ArticleDesign.LiveBlog,
	display: ArticleDisplay.Standard,
};

export default {
	component: TopicFilterBank,
	title: 'Components/TopicFilterBank',
};

const baseProperties = {
	id: '123',
	elements: [],
	attributes: { keyEvent: false, pinned: false, summary: false },
	primaryDateLine: '',
	secondaryDateLine: '',
};
const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			max-width: 620px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export const topicBank = () => {
	return (
		<Wrapper>
			<TopicFilterBank
				availableTopics={availableTopics}
				format={format}
				keyEvents={[
					{
						...baseProperties,
						blockFirstPublished: 1638279933000,
						title: 'title',
					},
				]}
				filterKeyEvents={false}
				id="key-events-carousel-desktop"
			/>
		</Wrapper>
	);
};
topicBank.storyName = 'topicBank';

export const topicBankSelectedIsNotInTop5 = () => {
	return (
		<Wrapper>
			<TopicFilterBank
				id="key-events-carousel-desktop"
				availableTopics={availableTopics}
				selectedTopics={selectedTopics}
				format={format}
				keyEvents={[
					{
						...baseProperties,
						blockFirstPublished: 1638279933000,
						title: 'title',
					},
				]}
				filterKeyEvents={false}
			/>
		</Wrapper>
	);
};
topicBankSelectedIsNotInTop5.storyName = 'topicBankSelectedIsNotInTop5';

export const notShowingTopicsWithLowerCounts = () => {
	return (
		<Wrapper>
			<TopicFilterBank
				id="key-events-carousel-desktop"
				availableTopics={availableTopicsWithLowerCount}
				selectedTopics={selectedTopics}
				format={format}
				keyEvents={[
					{
						...baseProperties,
						blockFirstPublished: 1638279933000,
						title: 'title',
					},
				]}
				filterKeyEvents={false}
			/>
		</Wrapper>
	);
};
notShowingTopicsWithLowerCounts.storyName = 'notShowingTopicsWithLowerCounts';

export const doesNotRenderWhenNoKeyEventsOrRelevantTopics = () => {
	return (
		<Wrapper>
			<TopicFilterBank
				id="key-events-carousel-desktop"
				availableTopics={onlyAvailableTopicsWithLowCount}
				selectedTopics={selectedTopics}
				format={format}
				keyEvents={[]}
				filterKeyEvents={false}
			/>
		</Wrapper>
	);
};
doesNotRenderWhenNoKeyEventsOrRelevantTopics.storyName =
	'doesNotRenderWhenNoKeyEventsOrRelevantTopics';
