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
	return (
		<ThrasherSlotNewsletterSignup
			newsletter={newsletter}
			editionId={'UK'}
			discussionApiUrl={''}
		/>
	);
};

export const sport = () => {
	return (
		<ThrasherSlotNewsletterSignup
			newsletter={{ ...newsletter, theme: 'sport' }}
			editionId={'UK'}
			discussionApiUrl={''}
		/>
	);
};
export const culture = () => {
	return (
		<ThrasherSlotNewsletterSignup
			newsletter={{ ...newsletter, theme: 'culture' }}
			editionId={'UK'}
			discussionApiUrl={''}
		/>
	);
};
export const lifestyle = () => {
	return (
		<ThrasherSlotNewsletterSignup
			newsletter={{ ...newsletter, theme: 'lifestyle' }}
			editionId={'UK'}
			discussionApiUrl={''}
		/>
	);
};
export const opinion = () => {
	return (
		<ThrasherSlotNewsletterSignup
			newsletter={{ ...newsletter, theme: 'opinion' }}
			editionId={'UK'}
			discussionApiUrl={''}
		/>
	);
};

export const withInvestigationPalette = () => {
	return (
		<ThrasherSlotNewsletterSignup
			containerPalette={'InvestigationPalette'}
			newsletter={newsletter}
			editionId={'UK'}
			discussionApiUrl={''}
		/>
	);
};
export const withSombrePalette = () => {
	return (
		<ThrasherSlotNewsletterSignup
			containerPalette={'SombrePalette'}
			newsletter={newsletter}
			editionId={'UK'}
			discussionApiUrl={''}
		/>
	);
};
export const withBreakingPalette = () => {
	return (
		<ThrasherSlotNewsletterSignup
			containerPalette={'BreakingPalette'}
			newsletter={newsletter}
			editionId={'UK'}
			discussionApiUrl={''}
		/>
	);
};
