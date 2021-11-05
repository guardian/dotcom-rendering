// ----- Imports ----- //

import { KeyEvent } from "./keyEvents";
import KeyEvents from "./keyEvents";
import { ArticlePillar, ArticleSpecial, ArticleTheme } from "@guardian/libs";
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

const KeyEventComp = (dark: boolean, theme: ArticleTheme, title: string) => (
	<div
		css={css`
			flex-grow: 1;
		`}
	>
		<div>{title}</div>
		<KeyEvents keyEvents={events} theme={theme} supportsDarkMode={dark} />
	</div>
);

const keyEventWithTheme = (dark: boolean) => () => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
		`}
	>
		{KeyEventComp(dark, ArticlePillar.News, "News")}
		{KeyEventComp(dark, ArticlePillar.Culture, "Culture")}
		{KeyEventComp(dark, ArticlePillar.Lifestyle, "Lifestyle")}
		{KeyEventComp(dark, ArticlePillar.Opinion, "Opinion")}
		{KeyEventComp(dark, ArticlePillar.Sport, "Sport")}
		{KeyEventComp(dark, ArticleSpecial.Labs, "Labs")}
		{KeyEventComp(dark, ArticleSpecial.SpecialReport, "SpecialReport")}
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
