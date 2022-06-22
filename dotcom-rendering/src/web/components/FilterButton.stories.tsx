import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { FilterButton } from './FilterButton.importable';

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			margin: 40px;
		`}
	>
		{children}
	</div>
);

const format = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.Sport,
};

export default {
	component: FilterButton,
	title: 'Components/FilterButton',
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const DefaultStory = () => (
	<Container>
		<FilterButton
			activeTopic="ORG:nhs"
			topicType="ORG"
			value="Fifa"
			count={1}
			format={format}
		/>
	</Container>
);

DefaultStory.story = { name: 'Default' };

export const ActiveStory = () => (
	<Container>
		<FilterButton
			activeTopic="ORG:nhs"
			topicType="ORG"
			value="nhs"
			count={21}
			format={format}
		/>
	</Container>
);

ActiveStory.story = { name: 'Active' };
