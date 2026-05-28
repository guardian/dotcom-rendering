import { css } from '@emotion/react';
import {
	focusHalo,
	from,
	headlineMedium20,
	space,
	textSans15,
} from '@guardian/source/foundations';
import { SvgNewsletterFilled } from '@guardian/source/react-components';
import { palette as themePalette } from '../palette';

export type NewsletterHighlightsCardProps = {
	highlightCardTitle: string;
	illustrationSquare?: string;
	onClick: () => void;
};

const wrapperStyles = css`
	clear: left;
`;

const cardButtonStyles = css`
	display: block;
	width: min(100%, 320px);
	text-align: left;
	border: 0;
	padding: ${space[3]}px ${space[3]}px ${space[4]}px;
	background-color: ${themePalette('--newsletter-card-background')};
	cursor: pointer;
	margin: 0 auto;

	${from.tablet} {
		width: 100%;
	}

	:focus-visible {
		${focusHalo};
	}
`;

const headerStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[3]}px;

	${from.tablet} {
		flex-direction: row;
		justify-content: space-between;
		gap: ${space[2]}px;
	}
`;

const textContentStyles = css`
	min-width: 0;
`;

const labelStyles = css`
	display: flex;
	align-items: center;
	color: ${themePalette('--newsletter-card-frequency-tag')};
	${textSans15};
	margin: 0 0 ${space[1]}px;

	svg {
		fill: currentColor;
		width: 20px;
		height: 20px;
	}
`;

const titleStyles = css`
	${headlineMedium20};
	margin: 0;
	color: ${themePalette('--newsletter-card-title')};
`;

const illustrationStyles = css`
	flex-shrink: 0;
	align-self: flex-end;
	width: 90px;
	height: 90px;
	border-radius: 50%;
	object-fit: cover;

	${from.tablet} {
		width: 100px;
		height: 100px;
	}
`;

export const NewsletterHighlightsCard = ({
	highlightCardTitle,
	illustrationSquare,
	onClick,
}: NewsletterHighlightsCardProps) => {
	const hasIllustration =
		typeof illustrationSquare === 'string' && illustrationSquare.length > 0;

	return (
		<aside css={wrapperStyles} aria-label="newsletter promotion">
			<button type="button" onClick={onClick} css={cardButtonStyles}>
				<div css={headerStyles}>
					<div css={textContentStyles}>
						<p css={labelStyles}>
							<SvgNewsletterFilled />
							Free newsletter
						</p>
						<p css={titleStyles}>{highlightCardTitle}</p>
					</div>
					{hasIllustration && (
						<img
							css={illustrationStyles}
							src={illustrationSquare}
							alt=""
							loading="lazy"
							decoding="async"
						/>
					)}
				</div>
			</button>
		</aside>
	);
};
