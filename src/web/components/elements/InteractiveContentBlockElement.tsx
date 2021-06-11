import { css } from '@emotion/react';

import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

const liStyles = css`
	border-top: 1px solid ${neutral[86]};
	border-top-width: 1px;
	border-top-style: solid;
	border-top-color: ${neutral[86]};
	:hover {
		background-color: ${neutral[86]};
	}
`;

const borderRightStyles = css`
	border-right: 1px solid ${neutral[86]};
	border-right-width: 1px;
	border-right-style: solid;
	border-right-color: ${neutral[86]};
`;

const linkStyles = css`
	display: flex;
	${textSans.medium()}

	padding-top: ${space[1]}px;
	padding-bottom: ${space[1]}px;
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;

	/* remove a tag link styling */
	text-decoration: inherit;
	color: inherit;
`;

const numberStyles = css`
	padding-right: ${space[1]}px;
	${textSans.medium({ fontWeight: 'bold' })}
`;

const stripOutHtml = (html: string) => {
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = html;
	return tempDiv.textContent || tempDiv.innerText || '';
};

type Props = {
	subheadingLinks: SubheadingBlockElement[];
};

const headerStyles = css`
	${textSans.large({ fontWeight: 'bold' })}
	padding-left: ${space[2]}px;
`;

const olStyles = css`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

export const InteractiveContentBlockElement = ({ subheadingLinks }: Props) => {
	return (
		<>
			<h2 css={headerStyles}>Contents</h2>
			<ol css={olStyles}>
				{subheadingLinks.map((subheadingLink, index) => {
					const title = stripOutHtml(subheadingLink.html);
					return (
						<li
							css={[
								liStyles,
								index % 2 === 0 && borderRightStyles,
							]}
						>
							<a
								data-ignore="global-link-styling"
								css={linkStyles}
								href={`#${subheadingLink.elementId}`}
								data-title={title}
							>
								<span css={numberStyles}>{index + 1}</span>
								{title}
							</a>
						</li>
					);
				})}
			</ol>
		</>
	);
};
