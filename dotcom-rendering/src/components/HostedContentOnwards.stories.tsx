import { trails } from '../layouts/HostedArticleLayout';
import { HostedContentOnwards } from './HostedContentOnwards';

export default {
	component: HostedContentOnwards,
	title: 'Components/HostedContentOnwards',
};

export const Default = () => {
	return <HostedContentOnwards trails={trails} brandName="TrendAI" />;
};

Default.storyName = 'default';

export const WithAccentColour = () => {
	return (
		<HostedContentOnwards
			trails={trails}
			brandName="TrendAI"
			accentColor="#FF0000"
		/>
	);
};

WithAccentColour.storyName = 'with accent colour';
