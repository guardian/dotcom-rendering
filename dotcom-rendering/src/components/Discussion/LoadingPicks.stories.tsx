import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/articleFormat';
import { LoadingPicks } from './LoadingPicks';

export default {
	component: LoadingPicks,
	title: 'Discussion/LoadingPicks',
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

export const Default = () => <LoadingPicks />;
Default.storyName = 'default';
