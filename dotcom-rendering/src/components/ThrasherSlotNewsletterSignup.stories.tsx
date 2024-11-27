import { ThrasherSlotNewsletterSignup } from './ThrasherSlotNewsletterSignup';

export default {
	component: ThrasherSlotNewsletterSignup,
	title: 'Components/ThrasherSlotNewsletterSignup',
};

const newsletter = {
	identityName: 'morning-mail',
	name: 'Morning Mail',
	theme: 'news',
	description:
		'Our Australian morning briefing breaks down the key stories of the day, telling you what’s happening and why it matters',
	frequency: 'Every weekday',
	listId: 4148,
	group: 'News in depth',
	successDescription:
		"We'll send you Guardian Australia's Morning Mail every weekday",
	regionFocus: 'AU',
	illustrationCard:
		'https://uploads.guim.co.uk/2024/11/12/5_3_fight_back.jpg',
};

export const standard = () => {
	return <ThrasherSlotNewsletterSignup newsletter={newsletter} />;
};
export const withInvestigationPalette = () => {
	return (
		<ThrasherSlotNewsletterSignup
			containerPalette={'InvestigationPalette'}
			newsletter={newsletter}
		/>
	);
};
export const withSombrePalette = () => {
	return (
		<ThrasherSlotNewsletterSignup
			containerPalette={'SombrePalette'}
			newsletter={newsletter}
		/>
	);
};
export const withBreakingPalette = () => {
	return (
		<ThrasherSlotNewsletterSignup
			containerPalette={'BreakingPalette'}
			newsletter={newsletter}
		/>
	);
};
