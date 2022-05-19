import { css } from '@emotion/react';

import { ArticleDesign, ArticleSpecial } from '@guardian/libs';

type Props = {
	format: ArticleFormat;
	age?: JSX.Element;
	mediaMeta?: JSX.Element;
	commentCount?: JSX.Element;
	cardBranding?: JSX.Element;
	supportingContent?: JSX.Element;
};

const spaceBetween = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const flexEnd = css`
	display: flex;
	justify-content: flex-end;
`;

export const CardFooter = ({
	format,
	age,
	mediaMeta,
	commentCount,
	cardBranding,
	supportingContent,
}: Props) => {
	if (format.theme === ArticleSpecial.Labs && cardBranding) {
		return <footer>{cardBranding}</footer>;
	}

	if (format.design === ArticleDesign.Media) {
		return (
			<footer>
				{supportingContent}
				<div css={spaceBetween}>
					{mediaMeta}
					{/* Show age if we have it otherwise try for commentCount */}
					{age || commentCount}
				</div>
			</footer>
		);
	}

	if (age) {
		return (
			<footer>
				{supportingContent}
				<div css={spaceBetween}>
					{age}
					{commentCount}
				</div>
			</footer>
		);
	}

	return (
		<footer>
			{supportingContent}
			<div css={flexEnd}>
				<>{commentCount}</>
			</div>
		</footer>
	);
};
