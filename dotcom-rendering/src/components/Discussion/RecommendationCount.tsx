import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	textSans,
} from '@guardian/source-foundations';
import { SvgArrowUpStraight } from '@guardian/source-react-components';
import { useState } from 'react';
import { recommend as recommendDefault } from '../../lib/discussionApi';
import type { SignedInWithCookies, SignedInWithOkta } from '../../lib/identity';
import { palette as themePalette } from '../../palette';
import { Row } from './Row';

type Props = {
	commentId: number;
	initialCount: number;
	alreadyRecommended: boolean;
	authStatus?: SignedInWithCookies | SignedInWithOkta;
	userMadeComment: boolean;
	onRecommend?: (commentId: number) => Promise<boolean>;
};

const countStyles = css`
	${textSans.xxsmall({ fontWeight: 'light' })}
	min-width: 0.75rem;
	color: ${sourcePalette.neutral[46]};
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
	authStatus,
	userMadeComment,
	onRecommend,
}: Props) => {
	const [count, setCount] = useState(initialCount);
	const [recommended, setRecommended] = useState(alreadyRecommended);
	const isSignedIn = authStatus !== undefined;

	const tryToRecommend = isSignedIn
		? () => {
				const newCount = count + 1;
				setCount(newCount);
				setRecommended(true);
				const recommend = onRecommend ?? recommendDefault(authStatus);

				recommend(commentId)
					.then((accepted) => {
						if (!accepted) {
							setCount(newCount - 1);
							setRecommended(alreadyRecommended);
						}
					})
					// TODO: do some error handling
					.catch(() => undefined);
		  }
		: undefined;

	return (
		<Row>
			<div css={countStyles}>{count}</div>
			<button
				css={buttonStyles(recommended, isSignedIn)}
				onClick={tryToRecommend}
				disabled={recommended || !isSignedIn || userMadeComment}
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
