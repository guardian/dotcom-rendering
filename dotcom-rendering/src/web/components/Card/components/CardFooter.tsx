import { css } from '@emotion/react';

import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { decidePalette } from '../../../lib/decidePalette';

type Props = {
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	age?: JSX.Element;
	mediaMeta?: JSX.Element;
	commentCount?: JSX.Element;
	cardBranding?: JSX.Element;
	supportingContent?: JSX.Element;
	renderLines?: boolean;
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

const linesWrapperStyles = css`
	/* Fill the container */
	flex: 1;
	align-self: flex-end;
`;

export const CardFooter = ({
	format,
	containerPalette,
	age,
	mediaMeta,
	commentCount,
	cardBranding,
	supportingContent,
	renderLines,
}: Props) => {
	const palette = decidePalette(format, containerPalette);
	if (format.theme === ArticleSpecial.Labs && cardBranding) {
		return <footer>{cardBranding}</footer>;
	}

	if (
		format.design === ArticleDesign.Comment ||
		format.design === ArticleDesign.Editorial ||
		format.design === ArticleDesign.Letter
	) {
		return (
			<footer>
				{supportingContent}
				<div css={spaceBetween}>
					{age}
					{renderLines && (
						<StraightLines
							cssOverrides={linesWrapperStyles}
							color={palette.border.lines}
							count={4}
						/>
					)}
					{commentCount}
				</div>
			</footer>
		);
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
