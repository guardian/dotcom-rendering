import { hostedOnwardsTrails } from '../../fixtures/manual/onwardsTrails';
import { HostedContentOnwards } from './HostedContentOnwards';

export default {
	component: HostedContentOnwards,
	title: 'Components/HostedContentOnwards',
};

export const Default = () => {
	return (
		<HostedContentOnwards
			trails={hostedOnwardsTrails}
			brandName="TrendAI"
		/>
	);
};

Default.storyName = 'default';

export const WithAccentColour = () => {
	return (
		<HostedContentOnwards
			trails={hostedOnwardsTrails}
			brandName="TrendAI"
			accentColor="#FF0000"
		/>
	);
};

WithAccentColour.storyName = 'with accent colour';
