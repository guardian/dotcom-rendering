import { css } from '@emotion/react';
import { textSans12 } from '@guardian/source/foundations';
import { SvgArrowUpStraight } from '@guardian/source/react-components';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import type { SignedInUser } from '../../lib/discussion';
import { palette as themePalette } from '../../palette';
import { Row } from './Row';

type Props = {
	commentId: string;
	initialCount: number;
	alreadyRecommended: boolean;
	user?: SignedInUser;
	userMadeComment: boolean;
	isClosedForRecommendations: boolean;
};

const countStyles = css`
	${textSans12};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	font-weight: 300;
	min-width: 0.75rem;
	color: ${themePalette('--discussion-subdued')};
	margin-right: 0.3125rem;
`;

const buttonStyles = (recommended: boolean, isSignedIn: boolean) => css`
	cursor: ${recommended || !isSignedIn ? 'default' : 'pointer'};
	width: 1.1875rem;
	height: 1.1875rem;
	background-color: ${recommended
		? themePalette('--recommendation-count-selected')
		: themePalette('--recommendation-count')};
	border-radius: 62.5rem;
	border: none;
`;

const arrowStyles = (recommended: boolean) => css`
	display: flex;
	flex-direction: column;
	align-items: center;
	svg {
		fill: ${recommended
			? themePalette('--recommendation-count-arrow-selected')
			: themePalette('--recommendation-count-arrow')};
		height: 15px;
		width: 15px;
	}
`;

export const RecommendationCount = ({
	commentId,
	initialCount,
	alreadyRecommended,
	user,
	userMadeComment,
	isClosedForRecommendations,
}: Props) => {
	const [count, setCount] = useState(initialCount);
	const [recommended, setRecommended] = useState(alreadyRecommended);

	const tryToRecommend: MouseEventHandler<HTMLButtonElement> = () => {
		if (!user) return;

		const newCount = count + 1;
		setCount(newCount);
		setRecommended(true);

		user.onRecommend(commentId)
			.then((accepted) => {
				if (!accepted) {
					setCount(newCount - 1);
					setRecommended(alreadyRecommended);
				}
			})
			// TODO: do some error handling
			.catch(() => undefined);
	};

	return (
		<Row>
			<div css={countStyles}>{count}</div>
			<button
				css={buttonStyles(recommended, !!user)}
				onClick={tryToRecommend}
				disabled={
					recommended ||
					!user ||
					userMadeComment ||
					isClosedForRecommendations
				}
				data-link-name="Recommend comment"
				aria-label="Recommend comment"
				type="button"
			>
				<div css={arrowStyles(recommended)}>
					<SvgArrowUpStraight />
				</div>
			</button>
		</Row>
	);
};
