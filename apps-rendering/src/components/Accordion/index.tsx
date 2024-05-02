// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	background,
	focusHalo,
	from,
	headlineBold20,
	line,
	neutral,
	remSpace,
} from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source-react-components';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface AccordionProps {
	children: ReactNode;
	accordionTitle: string;
	context: 'keyEvents' | 'liveFeed';
}

const detailsStyles: SerializedStyles = css`
	&:not([open]) .is-on,
	&[open] .is-off {
		display: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
`;

const titleRowStyles = css`
	cursor: pointer;
	position: relative;
	display: block;
	align-items: center;
	border-top: ${line.primary} 1px solid;
	background-color: ${background.primary};
	padding: ${remSpace[2]} ${remSpace[2]} ${remSpace[2]} ${remSpace[3]};
	&:focus {
		${focusHalo};
	}
	path {
		fill: ${neutral[46]};
	}
	svg {
		height: 2rem;
	}
	${darkModeCss`
		path {
			fill: ${neutral[60]};
		}
		background-color: ${neutral[10]};
		border-top: ${neutral[20]} 1px solid;
	`}
	${from.phablet} {
		padding: ${remSpace[2]} ${remSpace[4]} ${remSpace[2]} ${remSpace[5]};
	}
	${from.desktop} {
		display: none;
	}
`;

const titleStyle = css`
	${headlineBold20};
	color: ${neutral[7]};
	${darkModeCss`
		color: ${neutral[86]};
	`}
`;

const arrowPosition: SerializedStyles = css`
	position: absolute;
	right: ${remSpace[1]};
	top: ${remSpace[1]};

	${from.phablet} {
		right: ${remSpace[4]};
	}
`;

const backgroundColour = (
	context: 'keyEvents' | 'liveFeed',
): SerializedStyles => {
	if (context === 'keyEvents') {
		return css`
			background-color: ${background.primary};
			${from.desktop} {
				background-color: transparent;
			}
			${darkModeCss`
				background-color: ${neutral[10]};
			`}
		`;
	}
	return css`
		background-color: ${neutral[97]};
		${from.desktop} {
			background-color: transparent;
		}
		${darkModeCss`
			background-color: ${neutral[10]};
		`}
	`;
};

const paddingBody: SerializedStyles = css`
	padding: ${remSpace[3]};
	${from.mobileLandscape} {
		padding: ${remSpace[3]} ${remSpace[5]};
	}
	${from.desktop} {
		padding: 0;
	}
`;

const Accordion: FC<AccordionProps> = ({
	children,
	accordionTitle,
	context,
}) => {
	return (
		<details open css={detailsStyles}>
			<summary css={titleRowStyles}>
				<h2 css={titleStyle}>{accordionTitle}</h2>
				<span className="is-off" css={arrowPosition}>
					<SvgChevronDownSingle />
				</span>
				<span className="is-on" css={arrowPosition}>
					<SvgChevronUpSingle />
				</span>
			</summary>
			<div css={[backgroundColour(context), paddingBody]}>{children}</div>
		</details>
	);
};

// ----- Exports ----- //

export default Accordion;
