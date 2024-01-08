import { palette } from '@guardian/source-foundations';
import { LabsHeader } from './LabsHeader';
import { Section } from './Section';

export default {
	component: LabsHeader,
	title: 'Components/LabsHeader',
};

export const Default = () => {
	return (
		<Section
			fullWidth={true}
			showTopBorder={false}
			backgroundColour={palette.labs[400]}
			borderColour={palette.neutral[60]}
		>
			<LabsHeader />
		</Section>
	);
};
Default.storyName = 'Default';
