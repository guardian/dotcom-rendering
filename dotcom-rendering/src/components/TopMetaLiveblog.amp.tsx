import { css } from '@emotion/react';
import { headline, palette } from '@guardian/source-foundations';
import { string as curly } from 'curlyquotes';
import { getAgeWarning } from '../lib/age-warning';
import { getSoleContributor } from '../lib/byline';
import { neutralBorder, pillarPalette_DO_NOT_USE } from '../lib/pillars';
import { getSharingUrls } from '../lib/sharing-urls';
import type { AMPArticleModel } from '../types/article.amp';
import { Byline } from './Byline.amp';
import { MainMedia } from './MainMedia.amp';
import { TopMetaExtras } from './TopMetaExtras.amp';

const ListStyle = (iconColour: string) => css`
	li {
		margin-bottom: 6px;
		padding-left: 20px;
		p {
			display: inline;
		}
	}

	li:before {
		display: inline-block;
		content: '';
		border-radius: 6px;
		height: 12px;
		width: 12px;
		margin-right: 8px;
		background-color: ${iconColour};
		margin-left: -20px;
	}
`;

const headerStyle = (pillar: ArticleTheme) => css`
	${headline.small()};
	font-weight: 500;
	padding: 3px 10px 24px;
	color: ${palette.neutral[100]};
	background-color: ${pillarPalette_DO_NOT_USE[pillar].main};
`;

const bylineStyle = (pillar: ArticleTheme) => css`
	${headline.xxxsmall()};
	color: ${pillarPalette_DO_NOT_USE[pillar].main};
	padding-top: 3px;
	padding-bottom: 8px;
	font-style: italic;

	a {
		font-weight: 700;
		color: ${pillarPalette_DO_NOT_USE[pillar].main};
		text-decoration: none;
		font-style: normal;
	}
`;

const standfirstStyle = (pillar: ArticleTheme) => css`
	${headline.xxxsmall()};
	color: ${palette.neutral[100]};
	background-color: ${pillarPalette_DO_NOT_USE[pillar].dark};
	font-weight: bold;
	padding: 3px 10px 12px;

	a {
		color: ${palette.neutral[100]};
	}

	p {
		margin-bottom: 8px;
	}
	strong {
		font-weight: 700;
	}

	${ListStyle(neutralBorder(pillar))};
`;

const fullWidth = css`
	margin: 0 -10px;
`;

type HeadlineProps = {
	headlineText: string;
	standfirst: string;
	pillar: ArticleTheme;
};

const Headline = ({ headlineText, pillar, standfirst }: HeadlineProps) => {
	return (
		<div css={fullWidth}>
			<h1 css={headerStyle(pillar)}>{curly(headlineText)}</h1>
			<div
				css={standfirstStyle(pillar)}
				dangerouslySetInnerHTML={{
					__html: standfirst,
				}}
			/>
		</div>
	);
};

type TopMetaLiveblogProps = {
	articleData: AMPArticleModel;
	pillar: ArticleTheme;
};

export const TopMetaLiveblog = ({
	articleData,
	pillar,
}: TopMetaLiveblogProps) => (
	<header>
		<Headline
			headlineText={articleData.headline}
			standfirst={articleData.standfirst}
			pillar={pillar}
		/>

		{articleData.mainMediaElements.map((element, i) => (
			<MainMedia key={i} element={element} pillar={pillar} />
		))}

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
