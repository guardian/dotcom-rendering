import { palette as sourcePalette } from '@guardian/source/foundations';
import { CallToActionAtom } from './CallToActionAtom';

export default {
	component: CallToActionAtom,
	title: 'Components/CallToActionAtom',
};

export const Default = () => {
	return (
		<CallToActionAtom
			ctaLinkURL="Link URL"
			ctaBackgroundImage="Image URL"
			ctaText="This is a call to action"
			ctaButtonText="Learn more"
			accentColour={sourcePalette.brand[400]}
		/>
	);
};

Default.storyName = 'default';
