import { border, labs } from '@guardian/src-foundations';

import { LabsHeader } from './LabsHeader';
import { ElementContainer } from './ElementContainer';

export default {
	component: LabsHeader,
	title: 'Components/LabsHeader',
};

export const Default = () => {
	return (
		<ElementContainer
			showSideBorders={true}
			showTopBorder={false}
			backgroundColour={labs[400]}
			borderColour={border.primary}
		>
			<LabsHeader />
		</ElementContainer>
	);
};
Default.story = { name: 'Default' };
