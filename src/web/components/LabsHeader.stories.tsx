import { border, labs } from '@guardian/src-foundations';
import React from 'react';

import { LabsHeader } from './LabsHeader';
import { Section } from './Section';

export default {
	component: LabsHeader,
	title: 'Components/LabsHeader',
};

export const Default = () => {
	return (
		<Section
			showSideBorders={true}
			showTopBorder={false}
			backgroundColour={labs[400]}
			borderColour={border.primary}
		>
			<LabsHeader />
		</Section>
	);
};
Default.story = { name: 'Default' };
