import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { background, neutral } from '@guardian/src-foundations/palette';
import type { Format, Theme } from '@guardian/types';
import type { FC, ReactNode } from 'react';
import { adStyles, darkModeCss } from 'styles';
import type { ThemeStyles } from 'themeStyles';
import { getThemeStyles } from 'themeStyles';

const ArticleBodyStyles = (format: Format): SerializedStyles => css`
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
        padding-bottom: ${remSpace[2]};
    }
`;

interface ArticleBodyProps {
	theme: Theme;
	className: SerializedStyles[];
	children: ReactNode[];
	format: Format;
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
