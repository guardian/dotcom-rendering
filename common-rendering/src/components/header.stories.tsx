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

const Default: FC = () => (
	<Header
		theme={selectPillar(Pillar.News)}
		title="MPs debate health and social care tax rise after Starmer accuses Johnson of ‘hammering workers’ – UK politics live"
		credit="Politics live with Andrew Sparrow"
		standfirst={
			<>
				<p>
					<a href="https://www.theguardian.com/politics/live/2021/sep/08/health-social-care-levy-tax-ni-pmqs-sajid-javid-boris-johnson-politics-live?page=with:block-6138aefd8f0806f924aa786a#block-6138aefd8f0806f924aa786a">
						MPs debate tax rise
					</a>{" "}
					after Keir Starmer atacks Boris Johnson’s tax plans{" "}
					<a href="https://www.theguardian.com/politics/live/2021/sep/08/health-social-care-levy-tax-ni-pmqs-sajid-javid-boris-johnson-politics-live?page=with:block-61389a988f08d78b4987075b#block-61389a988f08d78b4987075b">
						during PMQs
					</a>
				</p>
				<ul>
					<li>
						<a href="https://www.theguardian.com/society/2021/sep/08/nhs-could-swallow-up-all-the-money-raised-by-new-tax-rise-says-ifs">
							NHS could ‘swallow up’ all the money raised by new
							tax rise, says IFS
						</a>
					</li>
					<li>
						<a href="https://www.theguardian.com/politics/2021/sep/08/starmer-lambasts-boris-johnson-manifesto-pledges-social-care">
							Starmer lambasts PM for breaking manifesto pledges
							on social care
						</a>
					</li>
					<li>
						<a href="https://www.theguardian.com/politics/2021/sep/07/boris-johnson-stakes-reputation-on-12bn-fix-for-health-and-social-care">
							Boris Johnson stakes reputation on £12bn fix for
							health and social care
						</a>
					</li>
					<li>
						<a href="https://www.theguardian.com/media/2021/sep/08/boris-plays-catch-up-what-the-papers-say-about-johnsons-tax-plan">
							‘Boris plays catch-up’: what the papers say about
							Johnson’s tax plan
						</a>
					</li>
					<li>
						<a href="https://www.theguardian.com/world/live/2021/sep/08/coronavirus-live-news-idaho-rationing-healthcare-pandemics-devastating-impact-on-hiv-tb-and-malaria">
							Coronavirus updates – live
						</a>
					</li>
				</ul>
			</>
		}
	/>
);

// ----- Exports ----- //

export default {
	component: Header,
	title: "Common/Components/Header",
};

export { Default };
