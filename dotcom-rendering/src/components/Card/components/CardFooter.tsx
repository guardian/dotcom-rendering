import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import { space } from '@guardian/source/foundations';

type Props = {
	format: ArticleFormat;
	age?: JSX.Element;
	commentCount?: JSX.Element;
	cardBranding?: JSX.Element;
	supportingContent?: JSX.Element;
	leftAlign?: boolean;
	showLivePlayable?: boolean;
};

const spacing = (leftAlign: boolean) => css`
	display: flex;
	justify-content: ${leftAlign ? 'flex-start' : 'space-between'};
	align-items: center;
	> {
		*:not(:first-child) {
			margin-left: ${space[1]}px;
		}
	}
`;

const margins = css`
	margin-top: ${space[1]}px;
`;

const flexEnd = css`
	display: flex;
	justify-content: flex-end;
`;

export const CardFooter = ({
	format,
	age,
	commentCount,
	cardBranding,
	supportingContent,
	leftAlign = false,
	showLivePlayable = false,
}: Props) => {
	if (showLivePlayable) return null;

	if (format.theme === ArticleSpecial.Labs && cardBranding) {
		return <footer css={margins}>{cardBranding}</footer>;
	}

	if (age) {
		return (
			<footer css={margins}>
				{supportingContent}
				<div css={spacing(leftAlign)}>
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
