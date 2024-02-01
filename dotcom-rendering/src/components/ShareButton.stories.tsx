import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ShareButton } from './ShareButton.importable';

export default {
	component: ShareButton,
	title: 'Components/ShareButton',
};

export const Small = () => {
	return <ShareButton pageId={'123'} webTitle={'The the'} />;
};
Small.storyName = 'Small';
Small.decorators = [splitTheme()];
