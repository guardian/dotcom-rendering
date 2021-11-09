import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background, neutral, remSpace } from '@guardian/source-foundations';
import type { Format } from '@guardian/types';
import type { FC, ReactNode } from 'react';
import { adStyles, darkModeCss } from 'styles';

interface ArticleBodyProps {
	className: SerializedStyles[];
	children: ReactNode[];
	format: Format;
}

const ArticleBodyStyles = (format: Format): SerializedStyles => css`
	position: relative;
	clear: both;

	iframe {
		width: 100%;
		border: none;
	}

	${adStyles(format)}

	twitter-widget,
    figure[data-atom-type="explainer"] {
		margin: ${remSpace[4]} 0;
		clear: both;
		display: inline-block;
	}
`;

const ArticleBodyDarkStyles: SerializedStyles = darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    figcaption {
        color: ${neutral[60]};
    }

    p:last-child {
        margin-bottom: 0;
        padding-bottom: 1em;
    }
`;

const ArticleBody: FC<ArticleBodyProps> = ({ className, children, format }) => (
	<div css={[ArticleBodyStyles(format), ArticleBodyDarkStyles, ...className]}>
		{children}
	</div>
);

export default ArticleBody;
