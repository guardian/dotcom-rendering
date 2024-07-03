import { css } from '@emotion/react';
import { text, textSans12 } from '@guardian/source/foundations';
import {
	neutralBorder,
	pillarMap,
	pillarPalette_DO_NOT_USE,
} from '../lib/pillars';
import ClockIcon from '../static/icons/clock.svg';
import { ShareIcons } from './ShareIcons.amp';

const pillarColours = pillarMap(
	(pillar) => css`
		color: ${pillarPalette_DO_NOT_USE[pillar].main};
	`,
);

const pillarFill = pillarMap(
	(pillar) => css`
		fill: ${pillarPalette_DO_NOT_USE[pillar].main};
	`,
);

const ageWarningCss = css`
	${textSans12};
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
	${textSans12};
	color: ${text.supporting};
	padding-top: 2px;
	margin-bottom: 6px;
	text-decoration: none;
`;

type WebPublicationDateProps = {
	date: string;
};

const WebPublicationDate = ({ date }: WebPublicationDateProps) => (
	<div css={metaStyle}>{date}</div>
);

type AgeWarningProps = {
	warning?: string;
	pillar: ArticleTheme;
};

const AgeWarning = ({ warning, pillar }: AgeWarningProps) => {
	if (!warning) {
		return null;
	}

	return (
		<div css={[ageWarningCss, pillarColours[pillar], pillarFill[pillar]]}>
			<ClockIcon /> {warning}
		</div>
	);
};

type TopMetaExtrasProps = {
	sharingUrls: SharingURLs;
	pillar: ArticleTheme;
	webPublicationDate: string;
	ageWarning?: string;
};

export const TopMetaExtras = ({
	sharingUrls,
	pillar,
	webPublicationDate,
	ageWarning,
}: TopMetaExtrasProps) => (
	<div css={metaExtras}>
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
