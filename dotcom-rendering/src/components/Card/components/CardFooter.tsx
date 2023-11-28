import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { decideContainerOverrides } from '../../../lib/decideContainerOverrides';
import { decidePalette } from '../../../lib/decidePalette';
import type { DCRContainerPalette } from '../../../types/front';

type Props = {
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
	displayLines?: boolean;
	age?: JSX.Element;
	commentCount?: JSX.Element;
	cardBranding?: JSX.Element;
	supportingContent?: JSX.Element;
	rightAlign?: boolean;
};

const spacing = (rightAlign: boolean) => css`
	display: flex;
	justify-content: ${rightAlign ? 'flex-end' : 'space-between'};
	align-items: center;
`;

const margins = css`
	margin-top: 3px;
	margin-bottom: 3px;
`;

const flexEnd = css`
	display: flex;
	justify-content: flex-end;
`;

export const CardFooter = ({
	format,
	containerPalette,
	displayLines,
	age,
	commentCount,
	cardBranding,
	supportingContent,
	rightAlign = false,
}: Props) => {
	const palette = decidePalette(format, containerPalette);

	const overrides =
		containerPalette && decideContainerOverrides(containerPalette);

	if (format.theme === ArticleSpecial.Labs && cardBranding) {
		return <footer css={margins}>{cardBranding}</footer>;
	}

	if (
		format.design === ArticleDesign.Comment ||
		format.design === ArticleDesign.Editorial ||
		format.design === ArticleDesign.Letter
	) {
		return (
			<footer css={margins}>
				{supportingContent}
				<div css={spacing(rightAlign)}>
					{age}
					{displayLines && (
						<StraightLines
							cssOverrides={css`
								/* Fill the space */
								flex: 1;
								align-self: flex-end;
							`}
							color={
								overrides?.border.lines ?? palette.border.lines
							}
							count={4}
						/>
					)}
					{commentCount}
				</div>
			</footer>
		);
	}

	if (age) {
		return (
			<footer css={margins}>
				{supportingContent}
				<div css={spacing(rightAlign)}>
					{age}
					{commentCount}
				</div>
			</footer>
		);
	}

	return (
		<footer css={margins}>
			{supportingContent}
			<div css={flexEnd}>
				<>{commentCount}</>
			</div>
		</footer>
	);
};
