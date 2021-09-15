// ----- Imports ----- //
import { css } from "@emotion/react";
import { KeyEvent } from "./keyEvents";
import KeyEvents from "./keyEvents";
import { Pillar, Special, Theme } from "@guardian/types";
import { useTimeAgo } from "../hooks/useTimeAgo";

// ----- Stories ----- //

const now = new Date();

function addMinutes(date: Date, minutes: number) {
	return new Date(date.getTime() - minutes * 60000).toISOString();
}

const currentTime = addMinutes(now, 0);
const thirtySeconds = addMinutes(now, 0.5);
const fiveMinutes = addMinutes(now, 5);
const fifteenMinutes = addMinutes(now, 15);
const oneHour = addMinutes(now, 60);
const oneDay = addMinutes(now, 60 * 24);
const oneWeek = addMinutes(now, 60 * 24 * 7);
const oneYear = addMinutes(now, 60 * 24 * 7 * 52);

const events: KeyEvent[] = [
	{
		time: currentTime,
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: thirtySeconds,
		text:
			"Ben Maher goes into the gold medal sport in the equestrian jumps",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: fiveMinutes,
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: fifteenMinutes,
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: oneHour,
		text: "Jodie Williams qualifies for the 400m final",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: oneDay,
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: oneWeek,
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
	{
		time: oneYear,
		text: "Gold for Uganda",
		url:
			"https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy",
	},
];

const KeyEventComp = (dark: boolean, theme: Theme, title: string) => (
	<div
		css={css`
			flex-grow: 1;
		`}
	>
		<div>{title}</div>
		<KeyEvents keyEvents={events} theme={theme} supportsDarkMode={dark} />
	</div>
);

const keyEventWithTheme = (dark: boolean) => () => {
	useTimeAgo();

	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				flex-wrap: wrap;
			`}
		>
			{KeyEventComp(dark, Pillar.News, "News")}
			{KeyEventComp(dark, Pillar.Culture, "Culture")}
			{KeyEventComp(dark, Pillar.Lifestyle, "Lifestyle")}
			{KeyEventComp(dark, Pillar.Opinion, "Opinion")}
			{KeyEventComp(dark, Pillar.Sport, "Sport")}
			{KeyEventComp(dark, Special.Labs, "Labs")}
			{KeyEventComp(dark, Special.SpecialReport, "SpecialReport")}
		</div>
	);
};

const Default = keyEventWithTheme(false);
const Dark = keyEventWithTheme(true);

// ----- Exports ----- //

export default {
	component: KeyEvents,
	title: "Common/Components/KeyEvents",
};

export { Default, Dark };
