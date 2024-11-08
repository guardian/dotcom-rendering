import { breakpoints } from '@guardian/source/foundations';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	getAllThemes,
} from '../lib/articleFormat';
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
			oldest="oldest"
			older="older"
			newer="newer"
			newest="newest"
			renderingTarget="Web"
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
			oldest="oldest"
			older="older"
			newer="newer"
			newest="newest"
			renderingTarget="Web"
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
			oldest="oldest"
			older="older"
			newer="newer"
			newest="newest"
			renderingTarget="Web"
		/>
	</>
);

lastPage.storyName = 'Last page';
lastPage.decorators = [splitTheme(formats, { orientation: 'vertical' })];
