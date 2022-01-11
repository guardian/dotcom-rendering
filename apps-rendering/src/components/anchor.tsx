// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { labs, neutral } from '@guardian/source-foundations';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';

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
	const inverted = text.invertedLink(format);
	const link = text.articleLink(format);

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
