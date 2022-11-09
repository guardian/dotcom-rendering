import { css } from '@emotion/react';
import { brand, from, neutral, textSans } from '@guardian/source-foundations';

const searchLinkStyles = css`
	${textSans.medium({ fontWeight: 'bold' })};
	color: ${neutral[100]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: 7px 0;

	${from.tablet} {
		padding: 7px 10px 7px 5px;
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
		border-left: 1px solid ${brand[600]};
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
				href="https://jobs.theguardian.com/?INTCMP=jobs_uk_web_newheader"
				css={searchLinkStyles}
				data-link-name="nav2 : job-cta"
			>
				Search jobs
			</a>
		</div>
	);
};
