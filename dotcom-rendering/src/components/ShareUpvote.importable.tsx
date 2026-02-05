import { css } from '@emotion/react';
import { textSans12 } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { palette as themePalette } from '../palette';
import DownArrowEmpty from '../static/icons/hack-arrow-empty.svg';
import DownArrowFilled from '../static/icons/hack-arrow-filled.svg';
import DownArrowRedEmpty from '../static/icons/hack-arrow-red-empty.svg';
import DownArrowRedFilled from '../static/icons/hack-arrow-red-filled.svg';

const randomUpvoteCount = () => {
	const random = Math.random();
	if (random < 0.2) return Math.ceil(Math.random() * 10);
	if (random < 0.7) return Math.ceil(Math.random() * 100);
	if (random < 0.99) return Math.ceil(Math.random() * 1000);
	return Math.ceil(Math.random() * 10000);
};

type Props = {
	isArticlePage?: boolean;
};

export const ShareUpvote = ({ isArticlePage = false }: Props) => {
	const [isUpvoted, setIsUpvoted] = useState(false);
	const [randomNumber, setRandomNumber] = useState(0);
	const [isRecommendedClicked, setIsRecommendedClicked] = useState(false);

	useEffect(() => {
		setRandomNumber(randomUpvoteCount());
	}, []);

	const EmptyArrow = isArticlePage ? DownArrowRedEmpty : DownArrowEmpty;
	const FilledArrow = isArticlePage ? DownArrowRedFilled : DownArrowFilled;

	return (
		<div
			css={css`
				display: flex;
				align-items: center;
				gap: 4px;
				position: relative;
			`}
		>
			{isArticlePage && (
				<>
					<button
						type="button"
						onClick={() =>
							setIsRecommendedClicked(!isRecommendedClicked)
						}
						css={css`
							background: none;
							border: none;
							padding: 0;
							margin: 0;
							font-family: 'GuardianTextSans';
							font-size: 12px;
							color: ${themePalette('--comment-count-fill')};
							text-align: center;
							font-weight: ${isUpvoted ? 'bold' : 'normal'};
							cursor: pointer;
						`}
					>
						<p>{isUpvoted ? 'Recommended' : 'Recommend'}</p>
					</button>
				</>
			)}

			<button
				className="hackday-upvote"
				data-tooltip={`
				Recommending an article
				helps other readers find
				pieces you value
				`}
				css={css`
					position: relative;
					display: inline-block;
					background: none;
					border: none;
					padding: 0;
					margin: 0;
					cursor: pointer;
					z-index: 100;
					line-height: 0;

					/* Tooltip content from data attribute */
					::before {
						content: attr(data-tooltip);
						${textSans12};
						position: absolute;
						background: #333;
						color: #f6f6f6;
						padding: 10px;
						border-radius: 8px;
						font-size: 0.875rem;
						white-space: nowrap;
						z-index: 1000;
						opacity: ${!isRecommendedClicked ? 0 : 1};
						visibility: ${!isRecommendedClicked
							? 'hidden'
							: 'visible'};
						transition:
							opacity 0.2s,
							visibility 0.2s;
						pointer-events: none;
						width: 186px;
						text-wrap-mode: wrap;
						text-align: left;

						/* Position tooltip to the left-bottom of the button */
						right: calc(100% - 25px);
						top: calc(100% + 50px);
						transform: translateY(-50%);
						z-index: 1001;
					}

					/* Tooltip arrow */
					::after {
						content: '';
						position: absolute;
						width: 0;
						height: 0;
						border: 9px solid transparent;
						border-bottom-color: #333;
						opacity: ${!isRecommendedClicked ? 0 : 1};
						visibility: ${!isRecommendedClicked
							? 'hidden'
							: 'visible'};
						transition:
							opacity 0.2s,
							visibility 0.2s;
						top: calc(100% + 4px);
						left: -3px;
						transform: translateY(-50%);
						z-index: 1000;
					}

					/* Show tooltip on hover */
					:hover::before,
					:hover::after {
						opacity: 1;
						visibility: visible;
					}
				`}
				type="button"
				onClick={() => {
					setIsUpvoted(!isUpvoted);
				}}
			>
				{isUpvoted ? <EmptyArrow /> : <FilledArrow />}
			</button>

			<span
				css={css`
					font-family: 'GuardianTextSans';
					font-size: 12px;
					color: ${themePalette('--comment-count-fill')};
					text-align: center;
				`}
			>
				{randomNumber + (isUpvoted ? 1 : 0)}
			</span>
		</div>
	);
};
