// ----- Imports ----- //

import type { FC } from "react";
import Header from "./header";
import { Pillar, Special, Theme } from "@guardian/types";
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

// ----- Stories ----- //

const Default: FC = () => <Header theme={selectPillar(Pillar.Culture)} />;

// ----- Exports ----- //

export default {
	component: Header,
	title: "Common/Components/Header",
};

export { Default };
