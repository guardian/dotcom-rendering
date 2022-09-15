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
	sectionName,
	editionId,
}: {
	sectionName?: string;
	editionId?: EditionId;
}) => {
	if (sectionName == 'lifestyle' && editionId == 'UK') {
		return (
			<LabsShadyPie
				title="It’s all about the berries: meet one of the farmers growing blackcurrants for Ribena"
				imageLink="https://i.guim.co.uk/img/media/f98f93c22a563b3107394d64e8410a062172de7d/0_37_2122_1273/master/2122.jpg?width=300&quality=85&auto=format&fit=max&s=d4b4dd6437b8fe07e9e3a1ac925caabc"
				contentLink="https://www.theguardian.com/growing-for-good/2022/aug/08/its-all-about-the-berries-meet-one-of-the-farmers-growing-blackcurrants-for-ribena?utm_source=shady-pie"
				sponsorLogoLink="https://static.theguardian.com/commercial/sponsor/20/Jul/2022/0a826298-8684-420d-90ab-d6d2797fbf6a-Suntory%20Logo.png"
			/>
		);
	} else if (sectionName == 'lifestyle' && editionId == 'US') {
		return (
			<LabsShadyPie
				title="Taiwan’s wind power revolution: leading the way in Asia-Pacific"
				imageLink="https://i.guim.co.uk/img/media/cd203c4a6361bc2143fdd4cc034ebd0609872ea9/0_256_4032_2419/master/4032.jpg?width=300&quality=85&auto=format&fit=max&s=2f6cdfaa6047e7db6c7f5cc73a3d8f57"
				contentLink="https://www.theguardian.com/power-of-green/2022/aug/10/taiwan-wind-power-renewable-energy-transition?utm_source=shady-pie"
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
