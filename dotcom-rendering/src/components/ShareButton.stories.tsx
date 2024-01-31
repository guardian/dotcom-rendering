import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { ShareButton } from './ShareButton.importable';

export default {
	component: ShareButton,
	title: 'Components/ShareButton',
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export const Small = ({}: StoryProps) => {
	return <ShareButton />;
};
Small.storyName = 'Small';
Small.decorators = [splitTheme([defaultFormat])];
