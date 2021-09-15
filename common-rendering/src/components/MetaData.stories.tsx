import { palette } from "@guardian/src-foundations";
import type { FC } from "react";
import { MetaData } from "./MetaData";
import { Pillar, Theme, Special } from "@guardian/types";
import { select } from "@storybook/addon-knobs";

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

const author = [
	{
		id: "/profile/andrewsparrow",
		name: "Andrew Sparrow",
		contributor: true,
	},
];

const tags = [
	{
		id: "tone/minutebyminute",
		type: "Tone",
		title: "Minute by minute",
	},
	{
		id: "tone/news",
		type: "Tone",
		title: "News",
	},
	{
		id: "profile/andrewsparrow",
		type: "Contributor",
		title: "Andrew Sparrow",
	},
];

const Default: FC = () => (
	<MetaData
		theme={selectPillar(Pillar.News)}
		palette={palette}
		byline="Andrew Sparrow"
		authors={author}
		tags={tags}
		primaryDateline="Tue 7 Sep 2021 14.32 BST"
		secondaryDateline="First published on Tue 7 Sep 2021 09.48 BST"
	/>
);

export default {
	title: "Common/Components/MetaData",
	component: MetaData,
};

export { Default };
