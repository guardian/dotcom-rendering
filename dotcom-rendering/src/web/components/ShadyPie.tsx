import { css } from '@emotion/react';
import { labs, neutral, text, textSans } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import LabsLogo from '../../static/logos/the-guardian-labs.svg';

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

const shadyStyle = css`
	color: ${neutral[7]};
	${textSans.medium({ fontWeight: 'regular' })};
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

const shadyBackground = css`
	background-color: ${neutral[97]};
`;

const shadyBanner = css`
	background-color: ${labs[400]};
	${textSans.xsmall({ fontWeight: 'bold' })};
	padding: 0.5rem;
`;

const shadyTitle = css`
	color: ${neutral[7]};
	padding-left: 0.5rem;
	padding-bottom: 0.5rem;
`;

const shadySponsorText = css`
	color: ${text.supporting};
	${textSans.xxsmall({ fontWeight: 'bold' })};
	text-align: center;
	padding-top: 1rem;
`;

const shadySponsorImg = css`
	margin: auto;
	display: block;
`;

const parentContainer = css`
	display: flex;
	align-items: flex-end;
`;

const labsLogoContainer = css`
	width: 180px;
	display: inline-block;
	padding: 0.5rem;
`;

const shadySponsorContainer = css`
	width: 120px;
	display: inline-block;
`;

const Logo = () => (
	<Link href="https://www.theguardian.com/guardian-labs">
		<LabsLogo />
	</Link>
);

export const ShadyPie = ({ sectionName }: { sectionName: string }) => {
	const pieFilling =
		sectionName == 'lifestyle' ? (
			<div css={shadyBackground}>
				<a
					css={shadyStyle}
					href="https://www.theguardian.com/growing-for-good/2022/aug/08/its-all-about-the-berries-meet-one-of-the-farmers-growing-blackcurrants-for-ribena"
					tabIndex={-1}
				>
					<img
						src="https://i.guim.co.uk/img/media/f98f93c22a563b3107394d64e8410a062172de7d/0_37_2122_1273/master/2122.jpg?width=620&quality=45&fit=max&dpr=2&s=9e01623babd043c1a2fbaec9db29fca2"
						width="300"
						alt=""
					/>
					<p css={shadyTitle}>
						It’s all about the berries: meet one of the farmers
						growing blackcurrants for Ribena
					</p>
				</a>
				<div css={shadyBanner}>
					<p>Paid content</p>
				</div>
				<div css={parentContainer}>
					<div css={labsLogoContainer}>
						<Logo />
					</div>
					<div css={shadySponsorContainer}>
						<p css={shadySponsorText}>Paid for by</p>
						<img
							src="https://static.theguardian.com/commercial/sponsor/20/Jul/2022/0a826298-8684-420d-90ab-d6d2797fbf6a-Suntory%20Logo.png"
							width="90"
							alt=""
							css={shadySponsorImg}
						/>
					</div>
				</div>
			</div>
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
