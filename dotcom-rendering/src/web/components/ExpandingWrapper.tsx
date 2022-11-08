import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	neutral,
	remHeight,
	space,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgMinus, SvgPlus } from '@guardian/source-react-components';
import type { ReactNode } from 'react';

// To Do: Could this be exported to source?

export interface ExpandingWrapperProps {
	format: ArticleFormat;
	children: ReactNode;
	renderExtra?: () => ReactNode;
}

const containerStyles = css`
	border-top: 1px solid ${neutral[86]};
	background: ${neutral[97]};
	box-shadow: none;
	position: relative;
	#expander-checkbox ~ label::after {
		content: 'Show more';
	}
	#expander-checkbox:checked ~ label::after {
		content: 'Show less';
	}
	#expander-checkbox:checked ~ #expander-overlay,
	#expander-checkbox ~ label #svgminus,
	#expander-checkbox:checked ~ label #svgplus {
		display: none;
	}
	#expander-checkbox:checked ~ label {
		background: ${neutral[100]};
		color: ${neutral[7]};
		#svgminus {
			fill: ${neutral[7]};
		}
	}
	#expander-checkbox ~ label #svgplus {
		fill: ${neutral[100]};
	}
	#expander-checkbox ~ label #svgplus,
	#expander-checkbox:checked ~ label #svgminus {
		display: block;
	}
	#expander-checkbox:checked ~ #collapsible-body {
		max-height: fit-content;
		margin-bottom: ${space[6]};
	}
`;

const overlayStyles = css`
	background-image: linear-gradient(
		0deg,
		${neutral[97]},
		${neutral[97]} 40%,
		rgba(255, 255, 255, 0)
	);
	height: 150px;
	position: absolute;
	bottom: 0;
	width: 100%;
	display: block;
`;

const fakeButtonStyles = css`
	display: inline-flex;
	justify-content: space-between;
	box-shadow: none;
	align-items: center;
	box-sizing: border-box;
	cursor: pointer;
	position: absolute;
	margin-top: -25px;
	margin-left: ${space[4]}px;
	border-radius: ${remHeight.ctaMedium}rem;
	padding: ${space[2]}px;
	border: 1px solid ${neutral[7]};
	text-decoration: none;
	background: ${neutral[7]};
	color: ${neutral[100]};
	height: ${remHeight.ctaMedium}rem;
	min-height: ${remHeight.ctaMedium}rem;
	${textSans.medium({ fontWeight: 'bold' })};
`;

const collapsibleBody = css`
	margin: 0;
	max-height: 25vh;
	overflow: hidden;
`;

const buttonIcon = css`
	svg {
		display: block;
		width: 1.5rem;
		height: auto;
		margin-left: -${space[1]};
		margin-right: ${space[1]};
	}
`;

// TODO: Split adding a skip to end of callout link into a new ticket
export const ExpandingWrapper = ({
	renderExtra,
	children,
}: {
	format: ArticleFormat;
	children: ReactNode;
	renderExtra?: () => ReactNode;
}) => {
	return (
		<div id="expander" css={containerStyles}>
			<input
				type="checkbox"
				css={css`
					visibility: hidden;
					${visuallyHidden};
				`}
				id="expander-checkbox"
				name="expander-checkbox"
				tabIndex={-1}
				key="PinnedPostCheckbox"
			/>
			<div id="collapsible-body" css={collapsibleBody}>
				{children}
			</div>
			<div id="expander-overlay" css={overlayStyles} />
			<label
				aria-hidden={true}
				css={fakeButtonStyles}
				htmlFor="expander-checkbox"
				id="expander-button"
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
			{renderExtra?.()}
		</div>
	);
};
