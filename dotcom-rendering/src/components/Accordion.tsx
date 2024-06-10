import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	focusHalo,
	from,
	headlineBold20,
	space,
} from '@guardian/source/foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source/react-components';
import { palette } from '../palette';

interface Props {
	children: React.ReactNode;
	accordionTitle: string;
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
	border-top: ${palette('--accordion-title-row-border-top')} 1px solid;
	background-color: ${palette('--accordion-title-row-background')};
	padding: ${space[2]}px ${space[2]}px ${space[2]}px ${space[3]}px;
	&:focus {
		${focusHalo};
	}
	path {
		fill: ${palette('--accordion-title-row-fill')};
	}
	svg {
		height: 2rem;
	}

	${from.phablet} {
		padding: ${space[2]}px ${space[4]}px ${space[2]}px ${space[5]}px;
	}
	${from.desktop} {
		display: none;
	}
`;

const titleStyle = css`
	${headlineBold20};
	color: ${palette('--accordion-title')};
`;

const arrowPosition: SerializedStyles = css`
	position: absolute;
	right: ${space[1]}px;
	top: ${space[1]}px;

	${from.phablet} {
		right: ${space[4]}px;
	}
`;

const contentStyles: SerializedStyles = css`
	background-color: ${palette('--accordion-background')};
	padding: ${space[3]}px;

	${from.mobileLandscape} {
		padding: ${space[3]}px ${space[5]}px;
	}

	${from.desktop} {
		background-color: transparent;
		padding: 0;
	}
`;

export const Accordion = ({ children, accordionTitle }: Props) => {
	return (
		<details open={true} css={detailsStyles}>
			<summary css={titleRowStyles}>
				<h2 css={titleStyle}>{accordionTitle}</h2>
				<span className="is-off" css={arrowPosition}>
					<SvgChevronDownSingle />
				</span>
				<span className="is-on" css={arrowPosition}>
					<SvgChevronUpSingle />
				</span>
			</summary>
			<div css={contentStyles}>{children}</div>
		</details>
	);
};
