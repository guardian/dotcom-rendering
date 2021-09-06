// ----- Imports ----- //

import type { FC } from "react";
import { KeyEvent } from "../keyEvent";
import KeyEvents from "./keyEvents";
import { Pillar, Special, Theme } from "@guardian/types";
import { select, withKnobs } from "@storybook/addon-knobs";

// ----- Stories ----- //

const pillarOptions = {
	News: Pillar.News,
	Opinion: Pillar.Opinion,
	Sport: Pillar.Sport,
	Culture: Pillar.Culture,
	Lifestyle: Pillar.Lifestyle,
	Labs: Special.Labs,
	SpecialReport: Special.SpecialReport,
};

const selectPillar = (initial: Pillar): Theme => {
	return select("Pillar", pillarOptions, initial);
};

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

const Default: FC = () => (
	<KeyEvents keyEvents={events} theme={selectPillar(Pillar.Opinion)} />
);

// ----- Exports ----- //

export default {
	component: KeyEvents,
	title: "Common/Components/KeyEvents",
	decorators: [withKnobs],
};

export { Default };
