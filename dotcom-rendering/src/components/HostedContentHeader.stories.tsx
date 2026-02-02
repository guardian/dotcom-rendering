import { palette as sourcePalette } from '@guardian/source/foundations';
import { HostedContentHeader } from './HostedContentHeader';
import { Section } from './Section';

export default {
	component: HostedContentHeader,
	title: 'Components/HostedContentHeader',
};

export const Default = () => {
	return (
		<Section
			fullWidth={true}
			showSideBorders={false}
			showTopBorder={false}
			shouldCenter={false}
			backgroundColour={sourcePalette.neutral[7]}
			padSides={false}
			element="aside"
		>
			<HostedContentHeader
				accentColor={sourcePalette.brand[400]}
				branding="Branding"
			/>
		</Section>
	);
};
Default.storyName = 'default';
