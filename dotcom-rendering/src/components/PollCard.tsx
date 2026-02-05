import { css } from '@emotion/react';
import {
	headlineBold17,
	headlineMedium28,
	headlineMedium24,
	article15,
	space,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { Picture } from './Picture';

const horizontalCard = css`
	position: relative;
	border-top: 1px solid ${palette('--section-border')};
	margin: ${space[2]}px;
	padding-bottom: ${space[2]}px;
	display: grid;
	overflow: hidden;
	cursor: pointer;
`;
const imageContainer = css`
	height: 110px;

	img {
		height: 110px;
		width: auto;
		overflow: hidden;
	}

	p {
		text-align: center;
		margin-top: 30px;
		${headlineMedium28};
		color: ${palette('--product-card-headline')};
	}

	span {
		${article15}
	}

	.high {
		opacity: 100%;
		animation: fadeInAnimationHigh ease-out 1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	.middling {
		opacity: 70%;
		${headlineMedium24};
		animation: fadeInAnimationMid ease-out 1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	.low {
		opacity: 40%;
		${headlineMedium24};
		animation: fadeInAnimationLow ease-out 1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	@keyframes fadeInAnimationHigh {
		0% {
			opacity: 0%;
		}

		100% {
			opacity: 100%;
		}
	}
	@keyframes fadeInAnimationMid {
		0% {
			opacity: 0%;
		}

		100% {
			opacity: 70%;
		}
	}
	@keyframes fadeInAnimationLow {
		0% {
			opacity: 0%;
		}

		100% {
			opacity: 40%;
		}
	}
`;

const productCardHeading = css`
	${headlineBold17};
	color: ${palette('--product-card-headline')};
	text-align: center;
`;

export const PollCard = ({
	name,
	image,
	format,
	voted,
	voteShare,
}: {
	name: string;
	image: string;
	format: ArticleFormat;
	voted: boolean;
	voteShare: number;
}) => {
	return (
		<div css={horizontalCard}>
			<div css={imageContainer}>
				{!voted ? (
					<Picture
						role={'productCard'}
						format={format}
						master={image}
						alt={''}
						height={200}
						width={200}
						loading={'eager'}
					/>
				) : (
					<p
						className={
							voteShare > 15
								? 'high'
								: voteShare > 8
								? 'middling'
								: 'low'
						}
					>
						{voteShare.toString()}%<br />
						<span>of votes</span>
					</p>
				)}
			</div>
			<div css={productCardHeading}>{name}</div>
		</div>
	);
};
