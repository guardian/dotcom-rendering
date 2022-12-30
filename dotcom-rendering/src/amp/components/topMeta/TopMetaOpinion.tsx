import { css } from '@emotion/react';
import { headline, neutral } from '@guardian/source-foundations';
import { getAgeWarning } from '../../../lib/age-warning';
import { getSoleContributor } from '../../../lib/byline';
import { pillarPalette_DO_NOT_USE } from '../../../lib/pillars';
import { getSharingUrls } from '../../../lib/sharing-urls';
import type { ArticleModel } from '../../types/ArticleModel';
import { MainMedia } from '../MainMedia';
import { Branding, BrandingRegionContainer } from './Branding';
import { Byline } from './Byline';
import { SeriesLink } from './SeriesLink';
import { Standfirst } from './Standfirst';
import { TopMetaExtras } from './TopMetaExtras';

const headerStyle = css`
	${headline.small()};
	font-weight: 100;
	padding-top: 3px;
	color: ${neutral[7]};
`;

const bylineStyle = (pillar: ArticleTheme) => css`
	${headline.small()};
	color: ${pillarPalette_DO_NOT_USE[pillar].main};
	font-style: italic;
	font-weight: 100;
	padding-top: 3px;

	a {
		color: ${pillarPalette_DO_NOT_USE[pillar].main};
		text-decoration: none;
	}
`;

const bylineImageStyle = css`
	display: block;
	margin-right: -18px;
	flex-shrink: 0;
`;

const bylineWrapper = css`
	display: flex;
	justify-content: space-between;

	background-image: repeating-linear-gradient(
		to bottom,
		${neutral[86]},
		${neutral[86]} 1px,
		transparent 1px,
		transparent 4px
	);
	background-repeat: repeat-x;
	background-position: bottom;
	background-size: 1px 29px;
	margin: 0 -10px;
	padding: 0 10px;
`;

const bottomPadding = css`
	padding-bottom: 72px;
`;

type BylineMetaProps = {
	articleData: ArticleModel;
	pillar: ArticleTheme;
};

const BylineMeta = ({ articleData, pillar }: BylineMetaProps) => {
	const contributorTag = articleData.tags.find((t) => t.type === 'Contributor');
	const contributorCount = articleData.tags.filter(
		(t) => t.type === 'Contributor',
	).length;
	const bylineImageUrl = contributorTag
		? contributorTag.bylineLargeImageUrl
		: null;

	const shouldShowBylineImage =
		contributorTag && bylineImageUrl && contributorCount === 1;

	return (
		<div css={bylineWrapper}>
			<div css={[bylineStyle(pillar), !shouldShowBylineImage && bottomPadding]}>
				<Byline
					byline={articleData.byline}
					tags={articleData.tags}
					guardianBaseURL={articleData.guardianBaseURL}
				/>
			</div>

			{!!shouldShowBylineImage && (
				<amp-img
					class={bylineImageStyle}
					src={bylineImageUrl}
					alt={`Contributor image for: ${contributorTag.title}`}
					width="180"
					height="150"
				/>
			)}
		</div>
	);
};

type TopMetaOpinionProps = {
	articleData: ArticleModel;
	pillar: ArticleTheme;
};

export const TopMetaOpinion = ({
	articleData,
	pillar,
}: TopMetaOpinionProps) => {
	return (
		<header>
			{articleData.mainMediaElements.map((element, i) => (
				<MainMedia key={i} element={element} pillar={pillar} />
			))}

			<SeriesLink
				baseURL={articleData.guardianBaseURL}
				tags={articleData.tags}
				pillar={pillar}
				fallbackToSection={false}
			/>

			<h1 css={headerStyle}>{articleData.headline}</h1>

			<BrandingRegionContainer
				commercialProperties={articleData.commercialProperties}
			>
				{(branding) => <Branding branding={branding} pillar={pillar} />}
			</BrandingRegionContainer>

			<BylineMeta articleData={articleData} pillar={pillar} />

			<Standfirst text={articleData.standfirst} pillar={pillar} />

			<TopMetaExtras
				sharingUrls={getSharingUrls(articleData.pageId, articleData.webTitle)}
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
