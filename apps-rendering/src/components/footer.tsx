// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	neutral,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import FooterContent from 'components/footerContent';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = css`
	border-width: 0 1px;
	${textSans.small({ lineHeight: 'regular' })};
	margin-left: ${remSpace[3]};
	margin-right: ${remSpace[3]};
	padding-top: ${remSpace[4]};
	padding-bottom: ${remSpace[4]};

	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}

	a {
		${textSans.small({ lineHeight: 'regular' })};
		color: ${neutral[7]};
		text-decoration: underline;
	}

	${darkModeCss`
        color: ${neutral[60]};

        a {
            color: ${neutral[60]};
        }
    `}
`;

interface Props {
	isCcpa: boolean;
}

const Footer: FC<Props> = ({ isCcpa }) => (
	<footer css={styles}>
		<FooterContent isCcpa={isCcpa} />
	</footer>
);

// ----- Exports ----- //

export default Footer;
