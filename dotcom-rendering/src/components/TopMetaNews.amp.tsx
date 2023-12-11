import { css } from '@emotion/react';
import { headline, neutral } from '@guardian/source-foundations';
import { string as curly } from 'curlyquotes';
import { getAgeWarning } from '../lib/age-warning';
import { getSoleContributor } from '../lib/byline';
import { pillarPalette_DO_NOT_USE } from '../lib/pillars';
import { getSharingUrls } from '../lib/sharing-urls';
import type { AMPArticleModel } from '../types/article.amp';
import { Branding, BrandingRegionContainer } from './Branding.amp';
import { Byline } from './Byline.amp';
import { Disclaimer } from './Disclaimer.amp';
import { MainMedia } from './MainMedia.amp';
import { SeriesLink } from './SeriesLink.amp';
import { Standfirst } from './Standfirst.amp';
import { StarRating } from './StarRating.amp';
import { TopMetaExtras } from './TopMetaExtras.amp';

const headerStyle = css`
	${headline.small()};
	font-weight: 500;
	padding-bottom: 24px;
	padding-top: 3px;
	color: ${neutral[7]};
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

type HeadlineProps = {
	headlineText: string;
	starRating?: number;
};

const Headline = ({ headlineText, starRating }: HeadlineProps) => {
	return (
		<div>
			<h1 css={headerStyle}>{curly(headlineText)}</h1>

			{starRating !== undefined && (
				<div css={starRatingWrapper}>
					<StarRating rating={starRating} size="large" />
				</div>
			)}
		</div>
	);
};

type TopMetaNewsProps = {
	articleData: AMPArticleModel;
	adTargeting?: AdTargeting;
	pillar: ArticleTheme;
};

export const TopMetaNews = ({
	articleData,
	adTargeting,
	pillar,
}: TopMetaNewsProps) => {
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

			{!!articleData.affiliateLinksDisclaimer && (
				<Disclaimer
					html={articleData.affiliateLinksDisclaimer}
					pillar={pillar}
				/>
			)}

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
