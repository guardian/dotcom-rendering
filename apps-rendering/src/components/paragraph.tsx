// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import { ArticleSpecial } from '@guardian/libs';
import { remSpace } from '@guardian/src-foundations';
import { body, textSans } from '@guardian/src-foundations/typography';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

interface Props {
	children?: ReactNode;
	format: ArticleFormat;
}

const styles = (theme: ArticleTheme): SerializedStyles => {
	const labs = theme === ArticleSpecial.Labs ? textSans.medium() : null;

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
