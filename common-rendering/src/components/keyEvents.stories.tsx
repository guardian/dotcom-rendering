// ----- Imports ----- //

import { KeyEvent } from "./keyEvents";
import KeyEvents from "./keyEvents";
import { Pillar, Theme } from "@guardian/types";
import { css } from "@emotion/react";

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

const keyEventComp = (dark: boolean, theme: Theme, title: string) => (
	<div css={flexItemStyles}>
		<div>{title}</div>
		<KeyEvents keyEvents={events} theme={theme} supportsDarkMode={dark} />
	</div>
);

const flexItemStyles = css`
	flex-grow: 1;
`;

const keyEventWithTheme = (dark: boolean) => () => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
			-ms-flex-positive: 1;
		`}
	>
		{keyEventComp(dark, Pillar.News, "News")}
		{keyEventComp(dark, Pillar.Culture, "Culture")}
		{keyEventComp(dark, Pillar.Lifestyle, "Lifestyle")}
		{keyEventComp(dark, Pillar.Opinion, "Opinion")}
		{keyEventComp(dark, Pillar.Sport, "Sport")}
	</div>
);

const Default = keyEventWithTheme(false);
const Dark = keyEventWithTheme(true);

// ----- Exports ----- //

export default {
	component: KeyEvents,
	title: "Common/Components/KeyEvents",
};

export { Default, Dark };
