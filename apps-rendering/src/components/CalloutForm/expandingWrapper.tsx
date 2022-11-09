import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	focusHalo,
	from,
	neutral,
	remHeight,
	remSpace,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';

// TODO: Could this be exported to source? Or should we put this all in atoms-rendering?

export interface ExpandingWrapperProps {
	format: ArticleFormat;
	children: ReactNode;
	name: string;
	renderExtra?: () => ReactNode;
}

const containerStyles = (format: ArticleFormat): SerializedStyles => css`
	border-image: repeating-linear-gradient(
			to bottom,
			${neutral[86]},
			${neutral[86]} 1px,
			transparent 1px,
			transparent 4px
		)
		13;
	border-top: 13px solid ${neutral[86]};
	background: ${neutral[97]};
	box-shadow: none;
	position: relative;

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

	#expander-checkbox:checked ~ #collapsible-body {
		max-height: fit-content;
		margin-bottom: ${remSpace[6]};
	}

	#expander-checkbox:focus ~ #collapsible-body {
		${focusHalo};
	}
`;

const overlayStyles = css`
	background-image: linear-gradient(
		0deg,
		${neutral[97]},
		${neutral[97]} 40%,
		rgba(255, 255, 255, 0)
	);
	height: 5rem;
	position: absolute;
	bottom: 0;
	width: 100%;
	display: block;

	${darkModeCss`
		background-image: linear-gradient(
			0deg,
			${neutral[10]},
			${neutral[10]} 40%,
			rgba(255, 255, 255, 0)
		);
	`}
`;

const fakeButtonStyles = (format: ArticleFormat): SerializedStyles => css`
	display: inline-flex;
	justify-content: space-between;
	box-shadow: none;
	align-items: center;
	box-sizing: border-box;
	cursor: pointer;
	position: absolute;
	// margin-left: ${remSpace[1]};
	bottom: -${remSpace[6]};
	border-radius: ${remHeight.ctaMedium}rem;
	padding: 0 ${remSpace[5]};
	border: 1px solid ${neutral[7]};
	text-decoration: none;
	background: ${neutral[7]};
	color: ${neutral[100]};
	height: ${remHeight.ctaMedium}rem;
	min-height: ${remHeight.ctaMedium}rem;
	${textSans.medium({ fontWeight: 'bold' })};

	${from.tablet} {
		margin-left: 3.75rem;
	}
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
		<div id="expander" css={containerStyles(format)}>
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
				css={fakeButtonStyles(format)}
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
