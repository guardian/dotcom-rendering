import { css } from '@emotion/react';
import {
	body,
	headline,
	palette as sourcePalette,
	textSans,
} from '@guardian/source-foundations';
import { SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { useState } from 'react';
import { decidePalette } from '../../lib/decidePalette';

/// SUMMARY ELEMENT

const titleStyling = css`
	${headline.xxxsmall({
		fontWeight: 'medium',
	})};
	margin: 0;
	line-height: 22px;
`;

const plusStyling = css`
	margin-right: 12px;
	margin-bottom: 6px;
	width: 33px;
	fill: white;
	height: 28px;
`;

const minusStyling = css`
	margin-right: 14px;
	margin-bottom: 6px;
	width: 30px;
	fill: white;
	height: 25px;
	padding-left: 4px;
`;

const iconSpacing = css`
	display: inline-flex;
	align-items: center;
	${textSans.small()};
`;

export const Summary = ({
	sectionTitle,
	title,
	format,
	expandCallback,
}: {
	format: ArticleFormat;
	sectionTitle: string;
	title: string;
	expandCallback: () => void;
}): JSX.Element => {
	const atomTitleStyling = css`
		display: block;
		${body.medium({
			lineHeight: 'tight',
			fontWeight: 'bold',
		})};
		color: ${decidePalette(format).text.expandableAtomHover};
	`;

	const showHideStyling = css`
		background: ${sourcePalette.neutral[7]};
		color: ${sourcePalette.neutral[100]};
		height: 2rem;
		position: absolute;
		bottom: 0;
		transform: translate(0, 50%);
		padding: 0 15px 0 7px;
		border-radius: 100em;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		border: 0;
		margin: 0;
		:hover {
			background: ${decidePalette(format).text.expandableAtomHover};
		}
	`;
	const [hasBeenExpanded, setHasBeenExpanded] = useState(false);
	const [expandEventSent, setExpandEventFired] = useState(false);
	return (
		//eslint-disable-next-line -- expected from atoms rendering
		<summary
			onClick={() => {
				if (!expandEventSent) {
					expandCallback();
					setExpandEventFired(true);
				}
				setHasBeenExpanded(!hasBeenExpanded);
			}}
		>
			<span css={atomTitleStyling}>{sectionTitle}</span>
			<h4 css={titleStyling}>{title}</h4>
			<span css={showHideStyling}>
				{!hasBeenExpanded ? (
					<span css={iconSpacing}>
						<span css={plusStyling}>
							<SvgPlus />
						</span>
						Show
					</span>
				) : (
					<span css={iconSpacing}>
						<span css={minusStyling}>
							<SvgMinus />
						</span>
						Hide
					</span>
				)}
			</span>
		</summary>
	);
};
