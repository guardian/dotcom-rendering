import { border, labs } from '@guardian/source-foundations';
import { ElementContainer } from './ElementContainer';
import { LabsHeader } from './LabsHeader.importable';

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
