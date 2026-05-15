import preview from '../../.storybook/preview';
import { EditionSwitcherBanner as EditionSwitcherBannerComponent } from './EditionSwitcherBanner.island';

const meta = preview.meta({
	title: 'Components/EditionSwitcherBanner',
	component: EditionSwitcherBannerComponent,
});

export const EditionSwitcherBanner = meta.story({
	args: {
		pageId: 'uk',
		edition: 'US',
	},
});
