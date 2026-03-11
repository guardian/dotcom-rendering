import { CallToActionAtom } from './CallToActionAtom';

export default {
	component: CallToActionAtom,
	title: 'Components/CallToActionAtom',
};

export const Default = () => {
	return (
		<CallToActionAtom
			url="https://safety.epicgames.com/en-US?lang=en-US"
			image="https://media.guim.co.uk/7fe58f11470360bc9f1e4b6bbcbf45d7cf06cfcf/0_0_1300_375/1300.jpg"
			label="This is a call to action text"
			btnText="Learn more"
		/>
	);
};

Default.storyName = 'default';
