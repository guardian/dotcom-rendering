// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { body, textSans } from '@guardian/src-foundations/typography';
import type { Format, Theme } from '@guardian/types';
import { Special } from '@guardian/types';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

interface Props {
	children?: ReactNode;
	format: Format;
}

const styles = (theme: Theme): SerializedStyles => {
	const labs = theme === Special.Labs ? textSans.medium() : null;

	return css`
		${body.medium()}
		overflow-wrap: break-word;
		margin: 0 0 ${remSpace[3]};

		${labs}
	`;
};

const Paragraph: FC<Props> = ({ children, format }: Props) => (
	<p css={styles(format.theme)}>{children}</p>
);

// ----- Exports ----- //

export default Paragraph;
