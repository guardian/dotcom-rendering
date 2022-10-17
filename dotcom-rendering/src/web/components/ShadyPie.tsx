import { ArticlePillar } from '@guardian/libs';
import type { EditionId } from '../../types/edition';
import { LabsShadyPie } from './LabsShadyPie';

const params = new URLSearchParams();
params.set(
	'acquisitionData',
	JSON.stringify({
		componentType: 'ACQUISITIONS_OTHER',
		source: 'GUARDIAN_WEB',
		campaignCode: 'shady_pie_open_2019',
		componentId: 'shady_pie_open_2019',
	}),
);
params.set('INTCMP', 'shady_pie_open_2019');

export const ShadyPie = ({
	editionId,
	format,
	abTest,
}: {
	editionId?: EditionId;
	format?: ArticleFormat;
	abTest?: boolean;
}) => {
	const queryString = 'utm_source=shady-pie-variant';
	if (
		format?.theme == ArticlePillar.Lifestyle &&
		editionId == 'UK' &&
		abTest
	) {
		return (
			<LabsShadyPie
				title="Can you feel it? How to use texture to give your home sensory appeal"
				imageLink="https://i.guim.co.uk/img/media/ac01967e539da23e25c90a46b64e3d7ac878cf2a/0_333_5000_3000/master/5000.jpg?width=300&quality=45&dpr=2&s=none"
				contentLink={`https://www.theguardian.com/in-my-element/2022/sep/28/can-you-feel-it-how-to-use-texture-to-give-your-home-sensory-appeal?${queryString}`}
				sponsorLogoLink="https://static.theguardian.com/commercial/sponsor/15/Sep/2022/0cd11bda-eeb4-4bf6-a328-da8cbc0ffe45-ebay_logo.png"
			/>
		);
	} else if (
		format?.theme == ArticlePillar.Lifestyle &&
		editionId == 'US' &&
		abTest
	) {
		return (
			<LabsShadyPie
				title="Taiwan’s wind power revolution: leading the way in Asia-Pacific"
				imageLink="https://i.guim.co.uk/img/media/cd203c4a6361bc2143fdd4cc034ebd0609872ea9/0_256_4032_2419/master/4032.jpg?width=300&quality=85&auto=format&fit=max&s=2f6cdfaa6047e7db6c7f5cc73a3d8f57"
				contentLink={`https://www.theguardian.com/power-of-green/2022/aug/10/taiwan-wind-power-renewable-energy-transition?${queryString}`}
				sponsorLogoLink="https://static.theguardian.com/commercial/sponsor/01/Dec/2020/94b79219-1cd5-4641-9a73-ce315575ee11-Orsted-badging.png"
			/>
		);
	} else {
		return (
			<a
				href={`https://support.theguardian.com/uk/subscribe/digital?${params.toString()}`}
				tabIndex={-1}
			>
				<img
					src="https://uploads.guim.co.uk/2020/10/02/Digisubs_MPU_c1_my_opt.png"
					width="300"
					alt=""
				/>
			</a>
		);
	}
};
