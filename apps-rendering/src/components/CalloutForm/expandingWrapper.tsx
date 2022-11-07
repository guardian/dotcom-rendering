import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	from,
	neutral,
	remHeight,
	remSpace,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgMinus, SvgPlus } from '@guardian/source-react-components';
import type { FC, ReactNode } from 'react';
import { darkModeCss } from 'styles';

// To Do: Could this be exported to source?

export interface ExpandingWrapperProps {
	format: ArticleFormat;
	children: ReactNode;
	renderExtra?: () => ReactNode;
}

const containerStyles = (format: ArticleFormat): SerializedStyles => css`
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
		margin-bottom: ${remSpace[6]};
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
	margin-left: ${remSpace[1]};
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

// TODO: Should there be a skip to end of content?
const ExpandingWrapper: FC<ExpandingWrapperProps> = ({
	format,
	renderExtra,
	children,
}) => {
	return (
		<div id="expander" css={containerStyles(format)}>
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
				css={fakeButtonStyles(format)}
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

export default ExpandingWrapper;
