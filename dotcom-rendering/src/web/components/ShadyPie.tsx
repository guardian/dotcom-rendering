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

export const ShadyPie = ({ sectionName }: { sectionName: string }) => {
	const pieFilling =
		sectionName == 'lifestyle' ? (
			<LabsShadyPie
				articleTitle="It’s all about the berries: meet one of the farmers growing blackcurrants for Ribena"
				articleImageLink="https://i.guim.co.uk/img/media/f98f93c22a563b3107394d64e8410a062172de7d/0_37_2122_1273/master/2122.jpg?width=620&quality=45&fit=max&dpr=2&s=9e01623babd043c1a2fbaec9db29fca2"
				articleLink="https://www.theguardian.com/growing-for-good/2022/aug/08/its-all-about-the-berries-meet-one-of-the-farmers-growing-blackcurrants-for-ribena"
				sponsorLogoLink="https://static.theguardian.com/commercial/sponsor/20/Jul/2022/0a826298-8684-420d-90ab-d6d2797fbf6a-Suntory%20Logo.png"
			/>
		) : (
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
	return pieFilling;
};
