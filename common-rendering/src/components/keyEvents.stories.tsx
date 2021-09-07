// ----- Imports ----- //

import { KeyEvent } from "../keyEvent";
import KeyEvents from "./keyEvents";
import { Pillar, Special, Theme } from "@guardian/types";

// ----- Stories ----- //

const events: KeyEvent[] = [
	{
		time: "1m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "2m ago",
		text:
			"Ben Maher goes into the gold medal sport in the equestrian jumps",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "3m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "5m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "9m ago",
		text: "Jodie Williams qualifies for the 400m final",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "15m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "20m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: "35m ago",
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
];

const Default = (args) => <KeyEvents keyEvents={events} {...args} />;

Default.args = {
	theme: Pillar.News,
};

// ----- Exports ----- //

export default {
	component: KeyEvents,
	title: "Common/Components/KeyEvents",
	argTypes: {
		theme: {
			options: [
				Pillar.News,
				Pillar.Opinion,
				Pillar.Sport,
				Pillar.Culture,
				Pillar.Lifestyle,
				Special.Labs,
				Special.SpecialReport,
			],
			control: { type: "select" },
		},
	},
};

export { Default };
