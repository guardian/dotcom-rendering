import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { getAllThemes } from '../lib/format';
import { Pagination } from './Pagination';

export default {
	component: Pagination,
	title: 'Components/Pagination',
	parameters: {
		layout: 'padded',
		chromatic: { viewports: [breakpoints.mobile, breakpoints.wide] },
	},
};

const formats = getAllThemes({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
});

export const notFirstPage = ({ format }: StoryProps) => (
	<>
		<Pagination
			key={JSON.stringify(format)}
			currentPage={2}
			totalPages={6}
			format={format}
			oldest="oldest"
			older="older"
			newer="newer"
			newest="newest"
		/>
	</>
);

notFirstPage.storyName = 'Not first page';
notFirstPage.decorators = [splitTheme(formats, { orientation: 'vertical' })];

export const firstPageStory = ({ format }: StoryProps) => (
	<>
		<Pagination
			key={JSON.stringify(format)}
			currentPage={1}
			totalPages={4}
			format={format}
			oldest="oldest"
			older="older"
			newer="newer"
			newest="newest"
		/>
	</>
);

firstPageStory.storyName = 'First page';
firstPageStory.decorators = [splitTheme(formats, { orientation: 'vertical' })];

export const lastPage = ({ format }: StoryProps) => (
	<>
		<Pagination
			key={JSON.stringify(format)}
			currentPage={9}
			totalPages={9}
			format={format}
			oldest="oldest"
			older="older"
			newer="newer"
			newest="newest"
		/>
	</>
);

lastPage.storyName = 'Last page';
lastPage.decorators = [splitTheme(formats, { orientation: 'vertical' })];
