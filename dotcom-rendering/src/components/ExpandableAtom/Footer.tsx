import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import { useState } from 'react';
import { palette as schemedPalette } from '../../palette';

/// LIKE/DISLIKE FEEDBACK FOOTER
const footerStyling = css`
	font-size: 13px;
	line-height: 16px;
	display: flex;
	justify-content: flex-end;
`;

// Currently no thumb icon in src-icons so a path is needed
const ThumbImage = () => {
	return (
		<svg
			css={css`
				width: 16px;
				height: 16px;
			`}
			viewBox="0 0 40 40"
		>
			<path
				fill="#FFF"
				d="M33.78 22.437l-4.228 13.98L27.93 37.5 5.062 34.14V15.503l7.8-1.517L24.354 2.5h1.624L28.9 5.426l-4.548 8.67h.107l10.477 1.31"
			></path>
		</svg>
	);
};

export const Footer = ({
	likeHandler,
	dislikeHandler,
}: {
	likeHandler: () => void;
	dislikeHandler: () => void;
}): JSX.Element => {
	// This is defined here because adding the hover styling using cx breaks the text styling
	const buttonStyling = css`
		display: inline-flex;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		background: black;
		color: white;
		border-style: hidden;
		border-radius: 100%;
		margin: 0 0 0 5px;
		padding: 0;
		width: 28px;
		height: 28px;
		:hover {
			background: ${schemedPalette('--expanding-atom-title-text')};
		}
		:focus {
			border: none;
		}
	`;
	const [showThankYou, setShowThankYou] = useState(false);
	return (
		<footer css={footerStyling}>
			<div hidden={showThankYou}>
				<div
					css={css`
						display: flex;
						align-items: center;
						${textSans.xsmall()};
					`}
				>
					<div>Was this helpful?</div>
					<button
						aria-label="yes, this was helpful"
						data-testid="like"
						css={buttonStyling}
						onClick={() => {
							likeHandler();
							setShowThankYou(true);
						}}
					>
						<ThumbImage />
					</button>
					<button
						aria-label="no, this was not helpful"
						css={[
							buttonStyling,
							css`
								transform: rotate(180deg);
							`,
						]}
						data-testid="dislike"
						onClick={() => {
							dislikeHandler();
							setShowThankYou(true);
						}}
					>
						<ThumbImage />
					</button>
				</div>
			</div>
			<div
				css={css`
					${textSans.xsmall()};
					height: 28px;
				`}
				data-testid="feedback"
				hidden={!showThankYou}
			>
				Thank you for your feedback.
			</div>
		</footer>
	);
};
