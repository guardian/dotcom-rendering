import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	focusHalo,
	remHeight,
	remSpace,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { useState } from 'react';
import type { FC, ReactNode } from 'react';

// TODO: Could this be exported to source? Or should we put this all in atoms-rendering?

export interface ExpandingWrapperProps {
	format: ArticleFormat;
	children: ReactNode;
	name: string;
	renderExtra?: () => ReactNode;
}

const containerStyles = (theme: any): SerializedStyles => css`
	border-image: repeating-linear-gradient(
			to bottom,
			${theme.expander.border},
			${theme.expander.border} 1px,
			transparent 1px,
			transparent 4px
		)
		13;
	border-top: 13px solid ${theme.expander.border};
	background: ${theme.background};
	box-shadow: none;
	position: relative;

	#expander-checkbox:checked ~ label {
		background: ${theme.expander.collapseBackground};
		color: ${theme.expander.collapseText};

		#svgminus {
			fill: ${theme.expander.collapseText};
		}
	}
	#expander-checkbox ~ label #svgplus {
		fill: ${theme.expander.expandText};
	}

	#expander-checkbox:checked ~ #collapsible-body {
		max-height: fit-content;
		margin-bottom: ${remSpace[6]};
	}

	#expander-checkbox:focus ~ #collapsible-body {
		${focusHalo};
	}
`;

const overlayStyles = (theme: any): SerializedStyles => css`
	background-image: linear-gradient(
		0deg,
		${theme.background} 0%,
		${theme.background} 40%,
		rgba(255, 255, 255, 0)
	);
	height: 5rem;
	position: absolute;
	bottom: 0;
	width: 100%;
	display: block;
`;

const fakeButtonStyles = (theme: any): SerializedStyles => css`
	display: inline-flex;
	justify-content: space-between;
	box-shadow: none;
	align-items: center;
	box-sizing: border-box;
	cursor: pointer;
	position: absolute;
	bottom: -${remSpace[6]};
	border-radius: ${remHeight.ctaMedium}rem;
	padding: 0 ${remSpace[5]};
	border: 1px solid ${theme.expander.expandBackground};
	text-decoration: none;
	background: ${theme.expander.expandBackground};
	color: ${theme.expander.expandText};
	height: ${remHeight.ctaMedium}rem;
	min-height: ${remHeight.ctaMedium}rem;
	${textSans.medium({ fontWeight: 'bold' })};
	margin-left: ${remSpace[2]};
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
		margin-left: -${remSpace[1]};
		margin-right: ${remSpace[1]};
	}
`;

const ExpandingWrapper: FC<ExpandingWrapperProps> = ({
	format,
	renderExtra,
	children,
	name,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<div id="expander" css={containerStyles}>
			<input
				type="checkbox"
				css={css`
					${visuallyHidden};
				`}
				id="expander-checkbox"
				name="expander-checkbox"
				onChange={(e): void => setIsExpanded(e.target.checked)}
				aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${name}`}
			/>
			<div
				id="collapsible-body"
				css={collapsibleBody}
				aria-hidden={!isExpanded}
			>
				{children}
			</div>

			{!isExpanded && <div id="expander-overlay" css={overlayStyles} />}
			{renderExtra?.()}
			<label
				aria-hidden={true}
				css={fakeButtonStyles}
				htmlFor="expander-checkbox"
				id="expander-button"
			>
				{isExpanded ? (
					<>
						<span id="svgminus" css={buttonIcon}>
							<SvgMinus />
						</span>
						Show Less
					</>
				) : (
					<>
						<span id="svgplus" css={buttonIcon}>
							<SvgPlus />
						</span>
						Show More
					</>
				)}
			</label>
		</div>
	);
};

export default ExpandingWrapper;
