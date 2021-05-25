import React from 'react';
import { css } from '@emotion/react';

import { text } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { textSans, body } from '@guardian/src-foundations/typography';

import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { MainMedia } from '@root/src/amp/components/MainMedia';
import { Byline } from '@root/src/amp/components/topMeta/Byline';
import { TopMetaExtras } from '@root/src/amp/components/topMeta/TopMetaExtras';
import { Standfirst } from '@root/src/amp/components/topMeta/Standfirst';
import { PaidForBand } from '@root/src/amp/components/topMeta/PaidForBand';

import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { getAgeWarning } from '@root/src/lib/age-warning';

const headerStyle = css`
	${textSans.xlarge()};
	font-weight: 400;
	padding-top: 3px;
	padding-bottom: 27px;
	color: ${palette.neutral[7]};
`;

const bylineStyle = css`
	${body.medium()};
	color: ${palette.neutral[7]};
	padding-bottom: 8px;
	font-style: italic;

	a {
		font-weight: 700;
		color: ${palette.neutral[7]};
		text-decoration: none;
		font-style: normal;
	}
	a:hover {
		text-decoration: underline;
	}
`;

const paidForLogoLabelStyle = css`
	${textSans.small()};
	font-weight: 700;
	margin-bottom: 6px;
	color: ${text.supporting};
`;
const paidForLogoStyle = css`
	padding-top: 4px;
	margin-top: 3px;
	margin-bottom: 12px;
`;

const PaidForByLogo: React.FC<{
	branding: Branding;
}> = ({ branding }) => {
	const { logo, sponsorName } = branding;

	return (
		<div css={paidForLogoStyle}>
			<div css={paidForLogoLabelStyle}>Paid for by</div>
			<a
				href={logo.link}
				data-sponsor={sponsorName.toLowerCase()}
				rel="nofollow"
				aria-label={`Visit the ${sponsorName} website`}
			>
				<amp-img
					src={logo.src}
					width="140px"
					height="90px"
					alt={sponsorName}
				/>
			</a>
		</div>
	);
};

const Headline: React.FC<{
	headlineText: string;
}> = ({ headlineText }) => <h1 css={headerStyle}>{headlineText}</h1>;

export const TopMetaPaidContent: React.FC<{
	articleData: ArticleModel;
	pillar: Theme;
}> = ({ articleData, pillar }) => {
	const { branding } = articleData.commercialProperties[
		articleData.editionId
	];

	return (
		<header>
			<PaidForBand />

			{articleData.mainMediaElements.map((element, i) => (
				<MainMedia key={i} element={element} pillar={pillar} />
			))}

			<Headline headlineText={articleData.headline} />

			{!!branding && <PaidForByLogo branding={branding} />}

			<Standfirst text={articleData.standfirst} pillar={pillar} />

			<div css={bylineStyle}>
				<Byline
					byline={articleData.author.byline}
					tags={articleData.tags}
					guardianBaseURL={articleData.guardianBaseURL}
				/>
			</div>

			<TopMetaExtras
				sharingUrls={getSharingUrls(
					articleData.pageId,
					articleData.webTitle,
				)}
				pillar={pillar}
				ageWarning={getAgeWarning(
					articleData.tags,
					articleData.webPublicationDate,
				)}
				webPublicationDate={articleData.webPublicationDateDisplay}
				twitterHandle={articleData.author.twitterHandle}
			/>
		</header>
	);
};
