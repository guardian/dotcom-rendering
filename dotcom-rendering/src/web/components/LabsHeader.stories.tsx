import { border, labs } from '@guardian/source-foundations';
import { ContainerLayout } from './ContainerLayout';
import { LabsHeader } from './LabsHeader.importable';

export default {
	component: LabsHeader,
	title: 'Components/LabsHeader',
};

export const Default = () => {
	return (
		<ContainerLayout
			fullWidth={true}
			showTopBorder={false}
			backgroundColour={labs[400]}
			borderColour={border.primary}
		>
			<LabsHeader />
		</ContainerLayout>
	);
};
Default.story = { name: 'Default' };
