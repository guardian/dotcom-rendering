import React from 'react';
import { css } from '@emotion/react';

import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';

import { pillarPalette_DO_NOT_USE, neutralBorder } from '@root/src/lib/pillars';
import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { MainMedia } from '@root/src/amp/components/MainMedia';
import { Byline } from '@root/src/amp/components/topMeta/Byline';
import { string as curly } from 'curlyquotes';
import { TopMetaExtras } from '@root/src/amp/components/topMeta/TopMetaExtras';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { getAgeWarning } from '@root/src/lib/age-warning';

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

const headerStyle = (pillar: Theme) => css`
	${headline.small()};
	font-weight: 500;
	padding: 3px 10px 24px;
	color: ${palette.neutral[100]};
	background-color: ${pillarPalette_DO_NOT_USE[pillar].main};
`;

const bylineStyle = (pillar: Theme) => css`
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

const standfirstStyle = (pillar: Theme) => css`
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

const Headline: React.FC<{
	headlineText: string;
	standfirst: string;
	pillar: Theme;
	starRating?: number;
}> = ({ headlineText, pillar, standfirst }) => {
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

export const TopMetaLiveblog: React.FC<{
	articleData: ArticleModel;
	pillar: Theme;
}> = ({ articleData, pillar }) => (
	<header>
		<Headline
			headlineText={articleData.headline}
			standfirst={articleData.standfirst}
			pillar={pillar}
			starRating={articleData.starRating}
		/>

		{articleData.mainMediaElements.map((element, i) => (
			<MainMedia key={i} element={element} pillar={pillar} />
		))}

		<div css={bylineStyle(pillar)}>
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
