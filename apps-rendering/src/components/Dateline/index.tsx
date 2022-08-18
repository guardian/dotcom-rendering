// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { Edition } from '@guardian/apps-rendering-api-models/edition';
import { ArticleDesign, ArticlePillar } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { from, neutral, text, textSans } from '@guardian/source-foundations';
import { map, withDefault } from '@guardian/types';
import type { Option } from '@guardian/types';
import { formatDate } from 'date';
import { datetimeFormat } from 'datetime';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import { darkModeCss as darkMode } from 'styles';

// ----- Component ----- //

interface Props {
	date: Option<Date>;
	format: ArticleFormat;
	edition: Edition;
}

const darkStyles = darkMode`
    color: ${neutral[60]};
`;

const defaultStyles = css`
	${textSans.xsmall()}
	color: ${text.supporting};

	${darkStyles}
`;

const commentDatelineStyles = css`
	${textSans.xsmall()}
	color: ${neutral[20]};

	${darkStyles}
`;

const getStyles = (
	colour: string,
	desktopColour: string,
): SerializedStyles => css`
	color: ${colour};
	display: block;
	${textSans.xxsmall({ lineHeight: 'tight' })}

	${from.desktop} {
		color: ${desktopColour};
	}

	${darkMode`
    	color: ${neutral[93]};
		${from.desktop} {
			color: ${neutral[60]};
		}
	`}
`;

const getDatelineStyles = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return getStyles(neutral[100], neutral[100]);
		case ArticleDesign.LiveBlog:
			return getStyles(neutral[100], neutral[20]);
		case ArticleDesign.DeadBlog:
			return getStyles(neutral[20], neutral[20]);
		default:
			switch (format.theme) {
				case ArticlePillar.Opinion:
					return commentDatelineStyles;
				default:
					return defaultStyles;
			}
	}
};

const Dateline: FC<Props> = ({ date, format, edition }) =>
	pipe(
		date,
		map((d) => (
			<time css={getDatelineStyles(format)}>
				{datetimeFormat(edition)(d)}
			</time>
		)),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Dateline;
