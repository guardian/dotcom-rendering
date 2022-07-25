// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign, ArticlePillar } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { from, neutral, text, textSans } from '@guardian/source-foundations';
import { map, withDefault } from '@guardian/types';
import type { Option } from '@guardian/types';
import { formatDate, fullyFormatDate } from 'date';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import { darkModeCss as darkMode } from 'styles';

// ----- Component ----- //

interface Props {
	date: Option<Date>;
	format: ArticleFormat;
}

const darkStyles = darkMode`
    color: ${neutral[60]};
`;

const styles = css`
	${textSans.xsmall()}
	color: ${text.supporting};

	${darkStyles}
`;

const commentDatelineStyles = css`
	${textSans.xsmall()}
	color: ${neutral[20]};

	${darkStyles}
`;

const blogDatelineStyles = (color: string): SerializedStyles => css`
	${textSans.xxsmall({ lineHeight: 'tight' })}
	display: block;
	color: ${color};

	${from.desktop} {
		color: ${neutral[20]};
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
		case ArticleDesign.LiveBlog:
			return blogDatelineStyles(neutral[100]);
		case ArticleDesign.DeadBlog:
			return blogDatelineStyles(neutral[20]);
		default:
			switch (format.theme) {
				case ArticlePillar.Opinion:
					return commentDatelineStyles;
				default:
					return styles;
			}
	}
};

const Dateline: FC<Props> = ({ date, format }) =>
	pipe(
		date,
		map((d) => (
			<time
				css={getDatelineStyles(format)}
				data-date={d}
				className="date js-date"
			>
				{format.design === ArticleDesign.LiveBlog ||
				format.design === ArticleDesign.DeadBlog
					? fullyFormatDate(d)
					: formatDate(d)}
			</time>
		)),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Dateline;
