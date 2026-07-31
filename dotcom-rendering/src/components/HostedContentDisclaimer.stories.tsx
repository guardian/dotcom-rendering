import { hostedPaletteDecorator } from '../../.storybook/decorators/themeDecorator';
import preview from '../../.storybook/preview';
import { HostedContentDisclaimer } from './HostedContentDisclaimer';
import { Section } from './Section';

const meta = preview.meta({
	component: HostedContentDisclaimer,
	title: 'Components/HostedContentDisclaimer',
	render: () => (
		<Section
			showSideBorders={false}
			showTopBorder={false}
			shouldCenter={false}
			element="section"
		>
			<HostedContentDisclaimer />
		</Section>
	),
	decorators: hostedPaletteDecorator('#d90c1f'),
});

export const Default = meta.story({});
