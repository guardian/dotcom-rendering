// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import { ArticleDesign } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { from, neutral, textSans } from '@guardian/source-foundations';
import { map, withDefault } from '../../../vendor/@guardian/types/index';
import type { Option } from '../../../vendor/@guardian/types/index';
import { datetimeFormat } from 'datetime';
import { pipe } from 'lib';
import { text } from 'palette';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	date: Option<Date>;
	format: ArticleFormat;
	edition: Edition;
}

const defaultStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.xsmall()}
	color: ${text.dateline(format)};

	${darkModeCss`
		color: ${text.datelineDark(format)};
	`}
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

	${darkModeCss`
    	color: ${neutral[93]};
		${from.desktop} {
			color: ${neutral[60]};
		}
	`}
`;

const getDatelineStyles = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return getStyles(neutral[86], neutral[86]);
		case ArticleDesign.LiveBlog:
			return getStyles(neutral[100], neutral[20]);
		case ArticleDesign.DeadBlog:
			return getStyles(neutral[20], neutral[20]);
		default:
			return defaultStyles(format);
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
