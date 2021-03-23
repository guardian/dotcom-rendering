// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import type { Format } from '@guardian/types';
import { Design, Special } from '@guardian/types';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props {
	href: string;
	children?: ReactNode;
	format: Format;
	className?: SerializedStyles;
	supportsDarkMode?: boolean;
}

const styles = (supportsDarkMode: boolean): SerializedStyles => css`
	text-decoration: none;
	${supportsDarkMode &&
	darkModeCss`
        color: ${neutral[86]};
        border-color: ${neutral[46]};
    `}
`;

const colour = (format: Format): SerializedStyles => {
	const { link, inverted } = getThemeStyles(format.theme);
	if (format.theme === Special.Labs) {
		return css`
			color: ${palette.labs[300]};
			border-bottom: 0.0625rem solid ${neutral[86]};

			${darkModeCss`
                    color: ${neutral[86]};
                `}
		`;
	}
	switch (format.design) {
		case Design.Media:
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
	supportsDarkMode = true,
}: Props) => (
	<a css={[styles(supportsDarkMode), colour(format), className]} href={href}>
		{children}
	</a>
);

// ----- Exports ----- //

export default Anchor;
