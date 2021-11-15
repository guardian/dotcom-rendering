// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { labs, neutral } from '@guardian/src-foundations/palette';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props {
	href: string;
	children?: ReactNode;
	format: ArticleFormat;
	className?: SerializedStyles;
	isEditions?: boolean;
}

const styles = (isEditions: boolean): SerializedStyles => css`
	text-decoration: none;
	${!isEditions &&
	darkModeCss`
        color: ${neutral[86]};
        border-color: ${neutral[46]};
    `}
`;

const colour = (format: ArticleFormat): SerializedStyles => {
	const { link, inverted } = getThemeStyles(format.theme);
	if (format.theme === ArticleSpecial.Labs) {
		return css`
			color: ${labs[300]};
			border-bottom: 0.0625rem solid ${neutral[86]};

			${darkModeCss`
                    color: ${neutral[86]};
                `}
		`;
	}
	switch (format.design) {
		case ArticleDesign.Media:
			return css`
				color: ${inverted};
				border-bottom: 0.0625rem solid ${neutral[20]};
			`;
		default:
			return css`
				color: ${link};
				border-bottom: 0.0625rem solid ${neutral[86]};
			`;
	}
};

const Anchor: FC<Props> = ({
	format,
	children,
	href,
	className,
	isEditions = false,
}: Props) => (
	<a css={[styles(isEditions), colour(format), className]} href={href}>
		{children}
	</a>
);

// ----- Exports ----- //

export default Anchor;
