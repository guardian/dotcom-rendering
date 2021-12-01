import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import { background, neutral, remSpace } from '@guardian/source-foundations';
import type { FC, ReactNode } from 'react';
import { adStyles, darkModeCss } from 'styles';
import type { ThemeStyles } from 'themeStyles';
import { getThemeStyles } from 'themeStyles';

const ArticleBodyStyles = (format: ArticleFormat): SerializedStyles => css`
	position: relative;
	clear: both;
	background: ${background.inverse};
	color: ${neutral[86]};

	${adStyles(format)}
`;

const ArticleBodyDarkStyles = ({
	inverted,
}: ThemeStyles): SerializedStyles => darkModeCss`
    a {
        color: ${inverted};
    }
    p:last-child {
        margin-bottom: 0;
        padding-bottom: ${remSpace[3]};
    }
`;

interface ArticleBodyProps {
	theme: ArticleTheme;
	className: SerializedStyles[];
	children: ReactNode[];
	format: ArticleFormat;
}

const ArticleBodyMedia: FC<ArticleBodyProps> = ({
	theme,
	className,
	children,
	format,
}) => (
	<div
		css={[
			ArticleBodyStyles(format),
			ArticleBodyDarkStyles(getThemeStyles(theme)),
			...className,
		]}
	>
		{children}
	</div>
);

export default ArticleBodyMedia;
