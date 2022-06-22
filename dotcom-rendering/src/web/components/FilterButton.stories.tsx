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
	theme: ArticlePillar.News,
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
			isActive={false}
			text="nhs"
			count={21}
			format={format}
			onClick={() => {}}
		/>
	</Container>
);

DefaultStory.story = { name: 'Default' };

export const ActiveStory = () => (
	<Container>
		<FilterButton
			isActive={true}
			text="nhs"
			count={21}
			format={format}
			onClick={() => {}}
		/>
	</Container>
);

ActiveStory.story = { name: 'Active' };

export const TruncatedStory = () => (
	<Container>
		<FilterButton
			isActive={false}
			text="Something thats too long to fit"
			count={21}
			format={format}
			onClick={() => {}}
		/>
	</Container>
);

TruncatedStory.story = { name: 'Truncated' };

export const TruncatedActiveStory = () => (
	<Container>
		<FilterButton
			isActive={true}
			text="Something thats too long to fit"
			count={21}
			format={format}
			onClick={() => {}}
		/>
	</Container>
);

TruncatedActiveStory.story = { name: 'TruncatedActive' };

export const FilterKeyEventsStory = () => (
	<Container>
		<FilterButton
			isActive={false}
			text="Filter Key Events"
			format={format}
			onClick={() => {}}
		/>
	</Container>
);

FilterKeyEventsStory.story = { name: 'FilterKeyEvents' };

export const FilterKeyEventsActiveStory = () => (
	<Container>
		<FilterButton
			isActive={true}
			text="Filter Key Events"
			format={format}
			onClick={() => {}}
		/>
	</Container>
);

FilterKeyEventsActiveStory.story = { name: 'FilterKeyEventsActive' };
