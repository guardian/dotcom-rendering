import { CallToActionButton } from './CallToActionAtom';

export default {
	component: CallToActionButton,
	title: 'Components/CallToActionButton',
};

export const Default = () => {
	return (
		<CallToActionButton
			linkUrl="https://www.trendmicro.com/vinfo/gb/security/research-and-analysis/predictions/the-ai-fication-of-cyberthreats-trend-micro-security-predictions-for-2026?utm_source=guardian&utm_medium=referral&utm_campaign=ent_cyber+risk_aw_e_ukie_int_guardian&utm_content=ghb"
			buttonText="Explore more"
		/>
	);
};

Default.storyName = 'default';

export const WithAccentColour = () => {
	return (
		<CallToActionButton
			linkUrl="https://www.trendmicro.com/vinfo/gb/security/research-and-analysis/predictions/the-ai-fication-of-cyberthreats-trend-micro-security-predictions-for-2026?utm_source=guardian&utm_medium=referral&utm_campaign=ent_cyber+risk_aw_e_ukie_int_guardian&utm_content=ghb"
			buttonText="Explore more"
			accentColor="#d71920"
		/>
	);
};

WithAccentColour.storyName = 'with accent colour';
