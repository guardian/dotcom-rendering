import { CallToActionAtom } from './CallToActionAtom';

export default {
	component: CallToActionAtom,
	title: 'Components/CallToActionAtom',
};

export const Default = () => {
	return (
		<CallToActionAtom
			ctaLinkURL="https://safety.epicgames.com/en-US?lang=en-US"
			ctaBackgroundImage="https://media.guim.co.uk/7fe58f11470360bc9f1e4b6bbcbf45d7cf06cfcf/0_0_1300_375/1300.jpg"
			ctaText="This is a call to action text"
			ctaButtonText="Learn more"
		/>
	);
};

Default.storyName = 'default';
