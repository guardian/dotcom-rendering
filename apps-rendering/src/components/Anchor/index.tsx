// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { labs, neutral } from '@guardian/source-foundations';
import { text } from 'palette';
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
	const linkDark = text.linkDark(format);
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
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return css`
				color: ${linkDark};
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
