import type { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	neutral,
	brand,
	remSpace,
	transitions,
	textSans,
	visuallyHidden,
	focusHalo,
	from,
	remHeight,
} from '@guardian/source-foundations';
import { SvgMinus, SvgPlus } from '@guardian/source-react-components';

export interface ExpandingWrapperProps {
	format: ArticleFormat;
	children: ReactNode;
}

const calloutContainerStyles = css`
	border-top: 1px solid ${neutral[86]};
	padding: ${remSpace[1]};
	position: relative;
	background: ${neutral[97]};
	margin-bottom: 2.125rem;
	#callout-form-checkbox:checked ~ #collapsible-body {
		max-height: fit-content;
		margin-bottom: ${remSpace[1]};
	}
	#callout-form-checkbox:checked ~ #callout-form-overlay,
	#callout-form-checkbox ~ label #svgminus,
	#callout-form-checkbox:checked ~ label #svgplus {
		display: none;
	}
	#callout-form-checkbox ~ label #svgplus,
	#callout-form-checkbox:checked ~ label #svgminus {
		display: block;
	}
	#callout-form-checkbox ~ label::after {
		content: 'Show more';
	}
	#callout-form-checkbox:checked ~ label::after {
		content: 'Show less';
	}
`;
const overlayStyles = css`
	background-image: linear-gradient(
		0deg,
		${neutral[100]},
		${neutral[100]} 40%,
		rgba(255, 255, 255, 0)
	);
	height: 5rem;
	position: absolute;
	bottom: 0;
	width: 100%;
	display: block;
`;

const fakeButtonStyles = css`
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	border: none;
	cursor: pointer;
	transition: ${transitions.medium};
	text-decoration: none;
	white-space: nowrap;
	&:focus {
		${focusHalo};
	}
	background: ${brand[400]};
	// margin-left: 0.625rem;
	position: absolute;
	bottom: -1.5rem;
	${textSans.medium({ fontWeight: 'bold' })};
	height: ${remHeight.ctaMedium}rem;
	min-height: ${remHeight.ctaMedium}rem;
	padding: 0 ${remSpace[5]} 0.125rem;
	border-radius: ${remHeight.ctaMedium}rem;
	color: white;
	${from.tablet} {
		margin-left: 3.75rem;
	}
`;

const collapsibleBody = css`
	width: 100%;
	max-height: 30vh;
	overflow: hidden;
`;

const buttonIcon = css`
	svg {
		display: block;
		fill: white;
		width: 1.5rem;
		height: auto;
		margin-left: -${remSpace[1]};
		margin-right: ${remSpace[1]};
	}
`;

export const ExpandingWrapper: FC<ExpandingWrapperProps> = ({ children }) => {
	return (
		<div
			id="callout-form"
			css={calloutContainerStyles}
			data-component="callout-form"
		>
			<input
				type="checkbox"
				css={css`
					visibility: hidden;
					${visuallyHidden};
				`}
				id="callout-form-checkbox"
				name="callout-form-checkbox"
				tabIndex={-1}
				key="PinnedPostCheckbox"
			/>
			<div id="collapsible-body" css={collapsibleBody}>
				{children}
			</div>
			<div id="callout-form-overlay" css={overlayStyles} />
			<label
				css={fakeButtonStyles}
				htmlFor="callout-form-checkbox"
				id="callout-form-button"
			>
				<>
					<span id="svgminus" css={buttonIcon}>
						<SvgMinus />
					</span>
					<span id="svgplus" css={buttonIcon}>
						<SvgPlus />
					</span>
				</>
			</label>
		</div>
	);
};
