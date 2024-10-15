// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '../../articleFormat';
import {
	breakpoints,
	from,
	neutral,
	remSpace,
	textSans15,
} from '@guardian/source/foundations';
import FooterContent from 'components/FooterContent';
import { background } from 'palette';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const defaultStyles = (format: ArticleFormat): SerializedStyles => css`
	border-width: 0 1px;
	${textSans15};
	margin-left: 0;
	margin-right: 0;
	padding-left: ${remSpace[3]};
	padding-right: ${remSpace[3]};
	padding-top: ${remSpace[4]};
	padding-bottom: ${remSpace[4]};
	background-color: ${background.footer(format)};

	${from.wide} {
		margin: 0 auto;
		width: ${breakpoints.wide}px;
	}

	a {
		${textSans15};
		color: ${neutral[7]};
		text-decoration: underline;
	}

	${darkModeCss`
		color: ${neutral[60]};
		background-color: ${background.footerDark(format)};

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

const DefaultFooter = ({ isCcpa, className }: Props) => (
	<footer css={className}>
		<FooterContent isCcpa={isCcpa} />
	</footer>
);

// ----- Exports ----- //

export default DefaultFooter;
export { defaultStyles };
