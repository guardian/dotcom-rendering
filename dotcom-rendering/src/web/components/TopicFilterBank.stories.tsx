import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { TopicFilterBank } from './TopicFilterBank';

const topics: Topic[] = [
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
];

const format = {
	theme: ArticlePillar.News,
	design: ArticleDesign.LiveBlog,
	display: ArticleDisplay.Standard,
};

export default {
	component: TopicFilterBank,
	title: 'Components/TopicFilterBank',
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
			<TopicFilterBank topics={topics} format={format} />
		</Wrapper>
	);
};
topicBank.story = {
	name: 'topicBank',
};
