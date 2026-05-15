import { HostedContentDisclaimer } from './HostedContentDisclaimer';
import { Section } from './Section';

export default {
	component: HostedContentDisclaimer,
	title: 'Components/HostedContentDisclaimer',
};

export const Default = () => {
	return (
		<Section
			showSideBorders={false}
			showTopBorder={false}
			shouldCenter={false}
			element="section"
		>
			<HostedContentDisclaimer />
		</Section>
	);
};

Default.storyName = 'default';
