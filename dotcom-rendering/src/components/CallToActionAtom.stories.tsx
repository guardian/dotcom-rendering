import { CallToActionAtom } from './CallToActionAtom';

export default {
	component: CallToActionAtom,
	title: 'Components/CallToActionAtom',
};

export const Default = () => {
	return (
		<CallToActionAtom
			linkUrl="https://www.trendmicro.com/vinfo/gb/security/research-and-analysis/predictions/the-ai-fication-of-cyberthreats-trend-micro-security-predictions-for-2026?utm_source=guardian&utm_medium=referral&utm_campaign=ent_cyber+risk_aw_e_ukie_int_guardian&utm_content=ghb"
			backgroundImage="https://media.guim.co.uk/2c2ad59a167c43496ff709d0d9a83e8d46c30674/0_0_1300_375/1300.jpg"
			text="Proactive security starts here"
			buttonText="Explore more"
		/>
	);
};

Default.storyName = 'default';

export const WithAccentColour = () => {
	return (
		<CallToActionAtom
			linkUrl="https://www.trendmicro.com/vinfo/gb/security/research-and-analysis/predictions/the-ai-fication-of-cyberthreats-trend-micro-security-predictions-for-2026?utm_source=guardian&utm_medium=referral&utm_campaign=ent_cyber+risk_aw_e_ukie_int_guardian&utm_content=ghb"
			backgroundImage="https://media.guim.co.uk/2c2ad59a167c43496ff709d0d9a83e8d46c30674/0_0_1300_375/1300.jpg"
			text="Proactive security starts here"
			buttonText="Explore more"
			accentColour="#d71920"
		/>
	);
};

WithAccentColour.storyName = 'with accent colour';
