import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { FilterButton } from './FilterButton.importable';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
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
	<Wrapper>
		<FilterButton
			isActive={false}
			type="ORG"
			value="nhs"
			count={21}
			format={format}
			onClick={() => {}}
		/>
	</Wrapper>
);

DefaultStory.story = { name: 'Default' };

export const ActiveStory = () => (
	<Wrapper>
		<FilterButton
			isActive={true}
			type="ORG"
			value="nhs"
			count={21}
			format={format}
			onClick={() => {}}
		/>
	</Wrapper>
);

ActiveStory.story = { name: 'Active' };

export const TruncatedStory = () => (
	<Wrapper>
		<FilterButton
			isActive={false}
			type="ORG"
			value="Something thats too long to fit"
			count={21}
			format={format}
			onClick={() => {}}
		/>
	</Wrapper>
);

TruncatedStory.story = { name: 'Truncated' };

export const TruncatedActiveStory = () => (
	<Wrapper>
		<FilterButton
			isActive={true}
			type="ORG"
			value="Something thats too long to fit"
			count={21}
			format={format}
			onClick={() => {}}
		/>
	</Wrapper>
);

TruncatedActiveStory.story = { name: 'TruncatedActive' };

export const FilterKeyEventsStory = () => (
	<Wrapper>
		<FilterButton
			isActive={false}
			value="Filter Key Events"
			format={format}
			onClick={() => {}}
		/>
	</Wrapper>
);

FilterKeyEventsStory.story = { name: 'FilterKeyEvents' };

export const FilterKeyEventsActiveStory = () => (
	<Wrapper>
		<FilterButton
			isActive={true}
			value="Filter Key Events"
			format={format}
			onClick={() => {}}
		/>
	</Wrapper>
);

FilterKeyEventsActiveStory.story = { name: 'FilterKeyEventsActive' };
