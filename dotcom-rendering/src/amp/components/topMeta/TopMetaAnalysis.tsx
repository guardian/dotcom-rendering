import { css } from '@emotion/react';
import { headline, neutral, until } from '@guardian/source-foundations';
import { string as curly } from 'curlyquotes';
import React from 'react';
import { getAgeWarning } from '../../../lib/age-warning';
import { getSoleContributor } from '../../../lib/byline';
import { pillarPalette_DO_NOT_USE } from '../../../lib/pillars';
import { getSharingUrls } from '../../../lib/sharing-urls';
import type { ArticleModel } from '../../types/ArticleModel';
import { MainMedia } from '../MainMedia';
import { StarRating } from '../StarRating';
import { Branding, BrandingRegionContainer } from './Branding';
import { Byline } from './Byline';
import { SeriesLink } from './SeriesLink';
import { Standfirst } from './Standfirst';
import { TopMetaExtras } from './TopMetaExtras';

const headerStyle = css`
	${headline.small()};
	font-weight: 500;
	padding-bottom: 24px;
	padding-top: 3px;
	color: ${neutral[7]};
`;

const underlinedStyles = css`
	background-image: repeating-linear-gradient(
		to bottom,
		transparent,
		transparent 47px,
		rgba(171, 6, 19, 0.5)
	);
	line-height: 48px;
	background-size: 1rem 48px;
	${until.tablet} {
		background-image: repeating-linear-gradient(
			to bottom,
			transparent,
			transparent 39px,
			rgba(171, 6, 19, 0.5)
		);
		line-height: 40px;
		background-size: 1px 40px;
	}

	background-position: top left;
	background-clip: content-box;
	background-origin: content-box;
`;

const bylineStyle = (pillar: ArticleTheme) => css`
	${headline.xxxsmall()};
	color: ${pillarPalette_DO_NOT_USE[pillar].main};
	padding-bottom: 8px;
	font-style: italic;

	a {
		font-weight: 700;
		color: ${pillarPalette_DO_NOT_USE[pillar].main};
		text-decoration: none;
		font-style: normal;
	}
`;

const starRatingWrapper = css`
	margin: 0 0 6px -10px;
`;

const Headline: React.FC<{
	headlineText: string;
	starRating?: number;
}> = ({ headlineText, starRating }) => {
	return (
		<div>
			<h1 css={[headerStyle, underlinedStyles]}>{curly(headlineText)}</h1>

			{starRating !== undefined && (
				<div css={starRatingWrapper}>
					<StarRating rating={starRating} size="large" />
				</div>
			)}
		</div>
	);
};

export const TopMetaAnalysis: React.FC<{
	articleData: ArticleModel;
	adTargeting?: AdTargeting;
	pillar: ArticleTheme;
}> = ({ articleData, adTargeting, pillar }) => {
	return (
		<header>
			{articleData.mainMediaElements.map((element, i) => (
				<MainMedia
					key={i}
					element={element}
					pillar={pillar}
					adTargeting={adTargeting}
				/>
			))}

			{!articleData.isImmersive && (
				<SeriesLink
					baseURL={articleData.guardianBaseURL}
					tags={articleData.tags}
					pillar={pillar}
					fallbackToSection={true}
					sectionLabel={articleData.sectionLabel}
					sectionUrl={articleData.sectionUrl}
				/>
			)}

			<Headline
				headlineText={articleData.headline}
				starRating={articleData.starRating}
			/>

			<Standfirst text={articleData.standfirst} pillar={pillar} />

			<BrandingRegionContainer
				commercialProperties={articleData.commercialProperties}
			>
				{(branding) => <Branding branding={branding} pillar={pillar} />}
			</BrandingRegionContainer>

			<div css={bylineStyle(pillar)}>
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
};
