import { css } from '@emotion/react';

import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { Lines } from '@guardian/source-react-components-development-kitchen';
import { from } from '@guardian/source-foundations';

type Props = {
	format: ArticleFormat;
	age?: JSX.Element;
	mediaMeta?: JSX.Element;
	commentCount?: JSX.Element;
	isFullCardImage?: boolean;
	cardBranding?: JSX.Element;
};

const spaceBetween = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const fullCardImageLayout = css`
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	margin-right: -1px;
	${from.tablet} {
		margin-bottom: -2px;
	}
`;

const flexEnd = css`
	display: flex;
	justify-content: flex-end;
`;

const linesWrapperStyles = css`
	/* Fill the container */
	flex-grow: 1;
	/* Push the lines down to align with the bottom of the card */
	margin-top: 5px;
`;

export const CardFooter = ({
	format,
	age,
	mediaMeta,
	commentCount,
	isFullCardImage,
	cardBranding,
}: Props) => {
	if (format.theme === ArticleSpecial.Labs && cardBranding) {
		return <footer>{cardBranding}</footer>;
	}

	if (
		!isFullCardImage &&
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Editorial ||
			format.design === ArticleDesign.Letter)
	) {
		return (
			<footer css={spaceBetween}>
				{age}
				<div css={linesWrapperStyles}>
					<Lines count={4} />
				</div>
				{commentCount}
			</footer>
		);
	}

	if (format.design === ArticleDesign.Media) {
		return (
			<footer css={spaceBetween}>
				{mediaMeta}
				{/* Show age if we have it otherwise try for commentCount */}
				{age || commentCount}
			</footer>
		);
	}

	if (age) {
		return (
			<footer css={isFullCardImage ? fullCardImageLayout : spaceBetween}>
				{age}
				{commentCount}
			</footer>
		);
	}

	return (
		<footer css={flexEnd}>
			<>{commentCount}</>
		</footer>
	);
};
