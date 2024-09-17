import { css } from '@emotion/react';
import { type ArticleFormat, ArticleSpecial } from '@guardian/libs';
import { palette, space, textSansBold12 } from '@guardian/source/foundations';

type Props = {
	format: ArticleFormat;
	age?: JSX.Element;
	commentCount?: JSX.Element;
	cardBranding?: JSX.Element;
	showLivePlayable?: boolean;
};

const contentStyles = css`
	margin-top: auto;
	padding-top: ${space[1]}px;
	display: flex;
	justify-content: 'flex-start';
	align-items: center;
	${textSansBold12}
	> {
		/* The dividing line is applied only to the second child. This ensures that no dividing line is added when there is only one child in the container. */
		:nth-child(2) {
			::before {
				content: '';
				display: block;
				width: 1px;
				height: 12px;
				position: absolute;
				bottom: 0;
				left: 0;
				background-color: ${palette.neutral[60]};
				margin-right: ${space[1]}px;
			}
			margin-left: ${space[1]}px;
			padding-left: ${space[1]}px;
		}
	}
`;

const labStyles = css`
	margin-top: ${space[1]}px;
`;

export const CardFooter = ({
	format,
	age,
	commentCount,
	cardBranding,
	showLivePlayable = false,
}: Props) => {
	if (showLivePlayable) return null;

	if (format.theme === ArticleSpecial.Labs && cardBranding) {
		return <footer css={labStyles}>{cardBranding}</footer>;
	}

	return (
		<footer css={contentStyles}>
			{age}
			{commentCount}
		</footer>
	);
};
