import { hostedPaletteDecorator } from '../../.storybook/decorators/themeDecorator';
import preview from '../../.storybook/preview';
import { hostedOnwardsTrails } from '../../fixtures/manual/onwardsTrails';
import { HostedContentOnwards } from './HostedContentOnwards';

const meta = preview.meta({
	component: HostedContentOnwards,
	title: 'Components/HostedContentOnwards',
	args: {
		trails: hostedOnwardsTrails,
		brandName: 'TrendAI',
		isGalleryPage: false,
	},
	render: (args) => <HostedContentOnwards {...args} />,
});

export const Default = meta.story({});

export const WithAccentColour = meta.story({
	decorators: hostedPaletteDecorator('#d90c1f'),
});

export const HostedGallery = meta.story({
	args: {
		isGalleryPage: true,
	},
	decorators: hostedPaletteDecorator('#d90c1f'),
});
