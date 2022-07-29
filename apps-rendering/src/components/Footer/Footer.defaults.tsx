// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	breakpoints,
	from,
	neutral,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import FooterContent from 'components/FooterContent';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const defaultStyles = (format: ArticleFormat): SerializedStyles => css`
	border-width: 0 1px;
	${textSans.small({ lineHeight: 'regular' })};
	margin-left: 0;
	margin-right: 0;
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};
	padding-top: ${remSpace[4]};
	padding-bottom: ${remSpace[4]};

	${from.wide} {
		margin: 0 auto;
		width: ${breakpoints.wide}px;
	}

	a {
		${textSans.small({ lineHeight: 'regular' })};
		color: ${neutral[7]};
		text-decoration: underline;
	}

	${darkModeCss`
		color: ${neutral[60]};
		background-color: ${background.articleContentDark(format)};

		a {
			color: ${neutral[60]};
		}
	`}
`;

interface Props {
	isCcpa: boolean;
	className?: string;
	css?: SerializedStyles;
}

const DefaultFooter: FC<Props> = ({ isCcpa, className }) => (
	<footer css={className}>
		<FooterContent isCcpa={isCcpa} />
	</footer>
);

// ----- Exports ----- //

export default DefaultFooter;
export { defaultStyles };
