import { css } from '@emotion/react';
import { body, neutral, text, textSans } from '@guardian/source-foundations';
import React from 'react';
import { getAgeWarning } from '../../../lib/age-warning';
import { getSoleContributor } from '../../../lib/byline';
import { getSharingUrls } from '../../../lib/sharing-urls';
import type { ArticleModel } from '../../types/ArticleModel';
import { MainMedia } from '../MainMedia';
import { BrandingRegionContainer } from './Branding';
import { Byline } from './Byline';
import { PaidForBand } from './PaidForBand';
import { Standfirst } from './Standfirst';
import { TopMetaExtras } from './TopMetaExtras';

const headerStyle = css`
	${textSans.xlarge()};
	font-weight: 400;
	padding-top: 3px;
	padding-bottom: 27px;
	color: ${neutral[7]};
`;

const bylineStyle = css`
	${body.medium()};
	color: ${neutral[7]};
	padding-bottom: 8px;
	font-style: italic;

	a {
		font-weight: 700;
		color: ${neutral[7]};
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
	pillar: ArticleTheme;
}> = ({ articleData, pillar }) => (
	<header>
		<PaidForBand />

		{articleData.mainMediaElements.map((element, i) => (
			<MainMedia key={i} element={element} pillar={pillar} />
		))}

		<Headline headlineText={articleData.headline} />

		<BrandingRegionContainer
			commercialProperties={articleData.commercialProperties}
		>
			{(branding) => <PaidForByLogo branding={branding} />}
		</BrandingRegionContainer>

		<Standfirst text={articleData.standfirst} pillar={pillar} />

		<div css={bylineStyle}>
			<Byline
				byline={articleData.byline}
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
				articleData.webPublicationDateDeprecated,
			)}
			webPublicationDate={articleData.webPublicationDateDisplay}
			twitterHandle={
				getSoleContributor(articleData.tags, articleData.byline)
					?.twitterHandle
			}
		/>
	</header>
);
