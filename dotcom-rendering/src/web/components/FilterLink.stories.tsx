import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { FilterLink } from './FilterLink';

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
	component: FilterLink,
	title: 'Components/FilterLink',
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};

export const DefaultStory = () => (
	<Wrapper>
		<FilterLink
			isActive={false}
			type="ORG"
			value="nhs"
			count={21}
			format={format}
			href={'?#'}
		/>
	</Wrapper>
);

DefaultStory.story = { name: 'Default' };

export const ActiveStory = () => (
	<Wrapper>
		<FilterLink
			isActive={true}
			type="ORG"
			value="nhs"
			count={21}
			format={format}
			href={'?#'}
		/>
	</Wrapper>
);

ActiveStory.story = { name: 'Active' };

export const TruncatedStory = () => (
	<Wrapper>
		<FilterLink
			isActive={false}
			type="ORG"
			value="Something thats too long to fit"
			count={21}
			format={format}
			href={'?#'}
		/>
	</Wrapper>
);

TruncatedStory.story = { name: 'Truncated' };

export const TruncatedActiveStory = () => (
	<Wrapper>
		<FilterLink
			isActive={true}
			type="ORG"
			value="Something thats too long to fit"
			count={21}
			format={format}
			href={'?#'}
		/>
	</Wrapper>
);

TruncatedActiveStory.story = { name: 'TruncatedActive' };

export const FilterKeyEventsStory = () => (
	<Wrapper>
		<FilterLink
			isActive={false}
			value="Filter Key Events"
			format={format}
			href={'?#'}
		/>
	</Wrapper>
);

FilterKeyEventsStory.story = { name: 'FilterKeyEvents' };

export const FilterKeyEventsActiveStory = () => (
	<Wrapper>
		<FilterLink
			isActive={true}
			value="Filter Key Events"
			format={format}
			href={'?#'}
		/>
	</Wrapper>
);

FilterKeyEventsActiveStory.story = { name: 'FilterKeyEventsActive' };
