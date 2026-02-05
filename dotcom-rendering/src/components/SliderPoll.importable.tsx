import { css } from '@emotion/react';
import { useState } from 'react';
import {
	LinkButton,
	type ThemeButton,
} from '@guardian/source/react-components';
import {
	textSans15,
	textSans17,
	textSans24,
} from '@guardian/source/foundations';
import { palette } from '../palette';

const theme: Partial<ThemeButton> = {
	backgroundPrimary: palette('--product-button-primary-background'),
	backgroundPrimaryHover: palette(
		'--product-button-primary-background-hover',
	),
	textPrimary: palette('--product-button-primary-text'),
	textTertiary: palette('--product-button-primary-background'),
	borderTertiary: palette('--product-button-primary-background'),
};

const buttonStyles = css`
	margin-top: 40px;
	margin-left: auto;
	margin-right: auto;
`;

export const SliderPoll = ({}: {}) => {
	const [hasVoted, setHasVoted] = useState(false);
	return (
		<div>
			<div
				css={[
					css`
						width: 100%;
						margin-top: 40px;
						display: flex;
						flex-direction: column;

						.question {
							${textSans24}
							text-align: center;
							margin-bottom: 15px;
						}

						.pointer {
							${textSans15}
							text-align: center;
							margin-left: 455px;
							margin-top: -80px;
							margin-bottom: 40.99px;
							width: 50px;
							color: white;
							z-index: 5;
						}

						.instructions {
							${textSans17}
							text-align: center;
							margin-top: 40px;
						}

						.slider {
							appearance: none;
							width: 90%;
							height: 10px;
							border-radius: 5px;
							background: ${palette(
								'--product-carousel-card-border',
							)};
							outline: none;
							opacity: 0.9;
							transition: opacity 0.2s;
							margin: auto;
							margin-top: 57.91px;
						}

						.slider::-webkit-slider-thumb {
							appearance: none;
							width: 25px;
							height: 25px;
							border-radius: 50%;
							background: ${palette('--product-card-headline')};
							cursor: pointer;
							:hover {
								opacity: 1;
							}
						}

						.results {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: baseline;
							animation: fadeInAnimation ease-out 1s;
							animation-iteration-count: 1;
							animation-fill-mode: forwards;
						}

						@keyframes fadeInAnimation {
							0% {
								opacity: 0%;
							}

							100% {
								opacity: 100%;
							}
						}

						.bar {
							background: ${palette('--product-card-headline')};
							width: 8.5%;
							border-radius: 3px;
						}

						.one {
							height: 20px;
						}
						.two {
							height: 25px;
						}
						.three {
							height: 30px;
						}
						.four {
							height: 45px;
						}
						.five {
							height: 60px;
						}
						.six {
							height: 95px;
						}
						.seven {
							height: 115px;
						}
						.eight {
							height: 130px;
						}
						.nine {
							height: 120px;
							opacity: 0.7;
						}
						.ten {
							height: 90px;
						}
						.eleven {
							height: 80px;
						}
					`,
				]}
			>
				{!hasVoted ? (
					<p className="question">Who should pay the fine?</p>
				) : (
					<p className="question">The reader verdict so far...</p>
				)}
				{!hasVoted && (
					<p className="instructions">
						Drag the slider then click 'Submit your judgement' to
						cast your vote
					</p>
				)}
				{!hasVoted ? (
					<input
						type="range"
						min="1"
						max="100"
						value="50"
						className="slider"
						id="slider-poll"
					></input>
				) : (
					<div className="results">
						<div className="bar one"></div>
						<div className="bar two"></div>
						<div className="bar three"></div>
						<div className="bar four"></div>
						<div className="bar five"></div>
						<div className="bar six"></div>
						<div className="bar seven"></div>
						<div className="bar eight"></div>
						<div className="bar nine"></div>
						<div className="bar ten"></div>
						<div className="bar eleven"></div>
					</div>
				)}

				{hasVoted && <p className="pointer">Your vote</p>}

				<div
					css={[
						css`
							display: flex;
							flex-direction: row;
							justify-content: space-between;

							p {
								width: 80px;
								${textSans15}
								margin-top: 15px;
								text-align: center;
							}
						`,
					]}
				>
					<p>Margaret should pay the fine</p>
					<p>They should go halves</p>
					<p>Georgia should pay the fine</p>
				</div>

				<LinkButton
					onClick={() => setHasVoted(!hasVoted)}
					priority="primary"
					size="small"
					theme={theme}
					data-ignore="global-link-styling"
					cssOverrides={buttonStyles}
				>
					{!hasVoted
						? 'Submit your judgement'
						: 'Thanks for your input!'}
				</LinkButton>
			</div>
		</div>
	);
};
