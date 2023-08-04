import { border, labs } from '@guardian/source-foundations';
import { LabsHeader } from './LabsHeader.tsx';
import { Section } from './Section.tsx';

export default {
	component: LabsHeader,
	title: 'Components/LabsHeader',
};

export const Default = () => {
	return (
		<Section
			fullWidth={true}
			showTopBorder={false}
			backgroundColour={labs[400]}
			borderColour={border.primary}
		>
			<LabsHeader />
		</Section>
	);
};
Default.storyName = 'Default';
