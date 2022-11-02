import { css } from '@emotion/react';
import { neutral, text, textSans } from '@guardian/source-foundations';
import React from 'react';
import {
	neutralBorder,
	pillarMap,
	pillarPalette_DO_NOT_USE,
} from '../../../lib/pillars';
import { ReactComponent as ClockIcon } from '../../../static/icons/clock.svg';
import { ReactComponent as TwitterIcon } from '../../../static/icons/twitter.svg';
import { ShareIcons } from '../ShareIcons';

const pillarColours = pillarMap(
	(pillar) =>
		css`
			color: ${pillarPalette_DO_NOT_USE[pillar].main};
		`,
);

const pillarFill = pillarMap(
	(pillar) =>
		css`
			fill: ${pillarPalette_DO_NOT_USE[pillar].main};
		`,
);

const ageWarningCss = css`
	${textSans.xxsmall()};
	display: inline-block;
	margin-bottom: 12px;
	width: 100%;
`;

const metaExtras = css`
	margin-bottom: 6px;
`;

const borders = (pillar: ArticleTheme) => css`
	border-top: 1px solid ${neutralBorder(pillar)};
	border-bottom: 1px solid ${neutralBorder(pillar)};
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-top: 6px;
`;

type SharingURLs = {
	[K in SharePlatform]?: {
		url: string;
		userMessage: string;
	};
};

const metaStyle = css`
	display: block;
	${textSans.xxsmall()};
	color: ${text.supporting};
	padding-top: 2px;
	margin-bottom: 6px;
	text-decoration: none;
`;

const twitterIcon = css`
	fill: ${neutral[46]};
	height: 12px;
	margin-bottom: -2px;
	width: 12px;
`;

const WebPublicationDate: React.FC<{
	date: string;
}> = ({ date }) => <div css={metaStyle}>{date}</div>;

const AgeWarning: React.FC<{
	warning?: string;
	pillar: ArticleTheme;
}> = ({ warning, pillar }) => {
	if (!warning) {
		return null;
	}

	return (
		<div css={[ageWarningCss, pillarColours[pillar], pillarFill[pillar]]}>
			<ClockIcon /> {warning}
		</div>
	);
};

const TwitterHandle: React.FC<{
	handle?: string;
}> = ({ handle }) => {
	if (!handle) {
		return null;
	}

	return (
		<a css={metaStyle} href={`https://twitter.com/${handle}`}>
			<TwitterIcon css={twitterIcon} /> @{handle}
		</a>
	);
};

export const TopMetaExtras: React.FC<{
	sharingUrls: SharingURLs;
	pillar: ArticleTheme;
	webPublicationDate: string;
	ageWarning?: string;
	twitterHandle?: string;
}> = ({
	sharingUrls,
	pillar,
	webPublicationDate,
	ageWarning,
	twitterHandle,
}) => (
	<div css={metaExtras}>
		<TwitterHandle handle={twitterHandle} />
		<WebPublicationDate date={webPublicationDate} />

		<div css={borders(pillar)}>
			<ul>
				<ShareIcons
					sharingUrls={sharingUrls}
					pillar={pillar}
					displayIcons={['facebook', 'twitter', 'email']}
				/>
			</ul>
			<AgeWarning warning={ageWarning} pillar={pillar} />
		</div>
	</div>
);
