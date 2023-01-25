import { getAllThemes } from '@guardian/common-rendering/src/fixtures/article';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { formatToString } from 'articleFormat';
import type { ReactElement } from 'react';
import { Pagination } from '.';

export default {
	component: Pagination,
	title: 'AR/Pagination',
	parameters: {
		layout: 'padded',
		chromatic: { viewports: [breakpoints.mobile, breakpoints.wide] },
	},
};

const formats = getAllThemes({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
});

export const notFirstPage = (): ReactElement => {
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
notFirstPage.story = {
	name: 'Not first page',
};

export const firstPageStory = (): ReactElement => {
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
firstPageStory.story = {
	name: 'First page',
};
