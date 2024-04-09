import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import type { StoryFn } from '@storybook/react';
import { formatToString } from 'articleFormat';
import { getAllThemes } from 'fixtures/article';
import { Pagination } from '.';

export default {
	component: Pagination,
	title: 'AR/Pagination',
	parameters: {
		layout: 'padded',
		chromatic: { viewports: [breakpoints.mobileMedium, breakpoints.wide] },
	},
};

const formats = getAllThemes({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
});

export const notFirstPage: StoryFn<typeof Pagination> = () => {
	return (
		<>
			{formats.map((format) => (
				<Pagination
					currentPage={2}
					totalPages={6}
					format={format}
					key={formatToString(format)}
				/>
			))}
		</>
	);
};
notFirstPage.storyName = 'Not first page';

export const firstPageStory: StoryFn<typeof Pagination> = () => {
	return (
		<>
			{formats.map((format) => (
				<Pagination
					currentPage={1}
					totalPages={4}
					format={format}
					key={formatToString(format)}
				/>
			))}
		</>
	);
};
firstPageStory.storyName = 'First page';
