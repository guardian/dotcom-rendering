import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { LoadingComments } from './LoadingComments';

export default {
	component: LoadingComments,
	title: 'Discussion/LoadingComments',
	decorators: [
		splitTheme([
			{
				theme: Pillar.Opinion,
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
			},
		]),
	],
};

export const Default = () => <LoadingComments />;
Default.storyName = 'default';
