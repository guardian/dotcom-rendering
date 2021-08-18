// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import type { Format } from '@guardian/types';
import { Design } from '@guardian/types';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const baseStyles = css`
	padding-left: ${remSpace[6]};
	padding-bottom: 0.375rem;

	&::before {
		display: inline-block;
		content: '';
		border-radius: 0.5rem;
		height: 1rem;
		width: 1rem;
		margin-right: ${remSpace[2]};
		background-color: ${neutral[86]};
		margin-left: -${remSpace[6]};
		vertical-align: middle;
	}

	> p:first-of-type {
		display: inline;
		padding: 0;
	}

	${darkModeCss`
        &::before {
            background-color: ${neutral[46]};
        }
    `}
`;

const mediaStyles = css`
	&::before {
		background-color: ${neutral[46]};
	}
`;

const styles = (format: Format): SerializedStyles => {
	switch (format.design) {
		case Design.Media:
			return css(baseStyles, mediaStyles);
		default:
			return baseStyles;
	}
};

interface Props {
	format: Format;
	children: ReactNode;
}

const ListItem: FC<Props> = ({ format, children }) => (
	<li css={styles(format)}>{children}</li>
);

// ----- Exports ----- //

export default ListItem;
