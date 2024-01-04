import { css } from '@emotion/react';
import { from, palette, textSans } from '@guardian/source-foundations';
import { nestedOphanComponents } from '../lib/ophan-helpers';

const searchLinkStyles = css`
	${textSans.medium({ fontWeight: 'bold' })};
	font-size: 1rem;
	line-height: 1;
	color: ${palette.neutral[100]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: 7px 0;

	${from.tablet} {
		padding: 8px 10px 7px 6px;
	}

	:hover,
	:focus {
		text-decoration: underline;
	}
`;

const linkTablet = css`
	display: none;

	:before {
		content: '';
		border-left: 1px solid ${palette.brand[600]};
		height: 24px;
	}

	${from.desktop} {
		display: flex;
	}
`;

export const SearchJobs = () => {
	return (
		<div css={linkTablet}>
			<a
				href="https://jobs.theguardian.com"
				css={searchLinkStyles}
				data-link-name={nestedOphanComponents('nav3', 'job-cta')}
			>
				Search jobs
			</a>
		</div>
	);
};
