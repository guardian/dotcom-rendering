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

export const SelectPillar = (initial: Pillar): Theme => {
	return select("Pillar", pillarOptions, initial);
};
