import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	background,
	focusHalo,
	from,
	headline,
	neutral,
	space,
} from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source-react-components';
import { palette } from '../palette';

interface Props {
	children: React.ReactNode;
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
	border-top: ${palette('--accordion-title-row-styles-border-top')} 1px solid;
	background-color: ${palette('--accordion-title-row-styles-background')};
	padding: ${space[2]}px ${space[2]}px ${space[2]}px ${space[3]}px;
	&:focus {
		${focusHalo};
	}
	path {
		fill: ${palette('--accordion-title-row-styles-fill')};
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
	${headline.xxsmall({ fontWeight: 'bold', lineHeight: 'tight' })};
	color: ${palette('--accordion-title-style-colour')};
`;

const arrowPosition: SerializedStyles = css`
	position: absolute;
	right: ${space[1]}px;
	top: ${space[1]}px;

	${from.phablet} {
		right: ${space[4]}px;
	}
`;

const backgroundColour = (
	context: 'keyEvents' | 'liveFeed',
): SerializedStyles => {
	if (context === 'keyEvents') {
		return css`
			background-color: ${palette(
				'--accordion-key-events-background-colour',
			)};
			${from.desktop} {
				background-color: transparent;
			}
		`;
	}
	return css`
		background-color: ${palette('--accordion-live-feed-background-colour')};
		${from.desktop} {
			background-color: transparent;
		}
	`;
};

const paddingBody: SerializedStyles = css`
	padding: ${space[3]}px;
	${from.mobileLandscape} {
		padding: ${space[3]}px ${space[5]}px;
	}
	${from.desktop} {
		padding: 0;
	}
`;

export const Accordion = ({ children, accordionTitle, context }: Props) => {
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
			<div css={[backgroundColour(context), paddingBody]}>{children}</div>
		</details>
	);
};
