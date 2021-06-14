import { useCallback, useState } from 'react';
import { css } from '@emotion/react';

import { from } from '@guardian/src-foundations/mq';
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
	${from.mobileLandscape} {
		border-right: 1px solid ${neutral[86]};
		border-right-width: 1px;
		border-right-style: solid;
		border-right-color: ${neutral[86]};
	}
`;

const linkStyles = css`
	display: flex;
	${headline.xxsmall({ fontWeight: 'light' })}

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

const headerStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
	padding-left: ${space[3]}px;
	padding-bottom: ${space[3]}px;
`;

const olStyles = css`
	${from.mobileLandscape} {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
`;

const wrapperStyles = css`
	margin-top: -5px; /* a hack to get tighter margin between interactive element and Divider */

	${from.tablet} {
		margin-left: -20px;
		width: calc(100% + 20px);
	}
	${from.leftCol} {
		margin-left: -10px;
		width: calc(100% + 10px);
	}
`;

type Props = {
	subheadingLinks: SubheadingBlockElement[];
};

export const InteractiveContentBlockElement = ({ subheadingLinks }: Props) => {
	// set the height explicitly of the container as to make sure that when we detach
	// list elements we do not effect the page height
	const [height, setHeight] = useState<number>();
	const divRef = useCallback((node: HTMLDivElement | null) => {
		if (node) setHeight(node?.getBoundingClientRect().height);
	}, []);

	return (
		<div ref={divRef} css={wrapperStyles} style={height ? { height } : {}}>
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
