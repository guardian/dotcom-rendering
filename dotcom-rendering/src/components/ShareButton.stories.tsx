import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { ShareButton } from './ShareButton.importable';

export default {
	component: ShareButton,
	title: 'Components/ShareButton',
};

export const Small = ({}: StoryProps) => {
	return <ShareButton />;
};
Small.storyName = 'Small';
Small.decorators = [splitTheme()];
