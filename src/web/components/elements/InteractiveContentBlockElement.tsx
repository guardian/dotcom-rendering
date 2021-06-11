import { css } from '@emotion/react';

import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';

const liStyles = css`
	border-top: 1px solid ${neutral[86]};
	border-top-width: 1px;
	border-top-style: solid;
	border-top-color: ${neutral[86]};
	:hover {
		background-color: ${neutral[93]};
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
	${headline.xxsmall()}

	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;
	padding-left: ${space[3]}px;
	padding-right: ${space[3]}px;

	/* remove a tag link styling */
	text-decoration: inherit;
	color: inherit;
`;

const numberStyles = css`
	padding-right: ${space[2]}px;
	${headline.xxsmall({ fontWeight: 'bold' })}
`;

type Props = {
	subheadingLinks: SubheadingBlockElement[];
};

const headerStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
	padding-left: ${space[3]}px;
	padding-bottom: ${space[3]}px;
`;

const olStyles = css`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

const wrapperStyles = css`
	margin-left: -10px;
	width: calc(100% + 10px);
`;

export const InteractiveContentBlockElement = ({ subheadingLinks }: Props) => {
	return (
		<div css={wrapperStyles}>
			<h2 css={headerStyles} data-ignore="global-h2-styling">
				Contents
			</h2>
			<ol css={olStyles}>
				{subheadingLinks.map((subheadingLink, index) => {
					// this isnt a perfect solution, but we need to extract the inner text
					// and we cannot use document.createElement solution (which is simpler)
					//  as we are SSR this component
					// https://stackoverflow.com/a/5002161/7378674
					const title = subheadingLink.html.replace(
						/<\/?[^>]+(>|$)/g,
						'',
					);
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
		</div>
	);
};
