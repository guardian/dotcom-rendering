import { css } from '@emotion/react';
import { labs, neutral, text, textSans } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import LabsLogo from '../../static/logos/the-guardian-labs.svg';

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

export const LabsShadyPie = ({
	articleTitle,
	articleImageLink,
	articleLink,
	sponsorLogoLink,
}: {
	articleTitle: string;
	articleImageLink: string;
	articleLink: string;
	sponsorLogoLink: string;
}) => {
	return (
		<div css={shadyBackground}>
			<a css={shadyStyle} href={articleLink} tabIndex={-1}>
				<img src={articleImageLink} width="300" alt="" />
				<p css={shadyTitle}>{articleTitle}</p>
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
						src={sponsorLogoLink}
						width="90"
						alt=""
						css={shadySponsorImg}
					/>
				</div>
			</div>
		</div>
	);
};
