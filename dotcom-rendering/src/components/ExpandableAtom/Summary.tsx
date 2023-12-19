import { css } from '@emotion/react';
import { body, headline, textSans } from '@guardian/source-foundations';
import { SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { useState } from 'react';
import { palette as schemedPalette } from '../../palette';

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
	fill: ${schemedPalette('--expanding-atom-button-text')};
	height: 28px;
`;

const minusStyling = css`
	margin: auto 14px auto 0;
	width: 30px;
	fill: ${schemedPalette('--expanding-atom-button-text')};
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
	expandCallback,
}: {
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
		color: ${schemedPalette('--expanding-atom-title-text')};
	`;

	const showHideStyling = css`
		background: ${schemedPalette('--expanding-atom-button-background')};
		color: ${schemedPalette('--expanding-atom-button-text')};
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
			background: ${schemedPalette('--expanding-atom-title-text')};
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
