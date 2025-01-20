import { css } from '@emotion/react';
import { palette, space, textSansBold12 } from '@guardian/source/foundations';
import { type ArticleFormat, ArticleSpecial } from '../../../lib/articleFormat';
import CameraSvg from '../../../static/icons/camera.svg';
import type { MainMedia } from '../../../types/mainMedia';

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

const galleryContentStyles = css`
	${contentStyles}
	padding: ${space[1]}px ${space[2]}px;
	background-color: ${palette.neutral[7]};
	width: fit-content;
	color: ${palette.neutral[100]};
	border-radius: 40px;
	> {
		/* The dividing line is applied only to the second child. This ensures that no dividing line is added when there is only one child in the container. */
		:nth-child(2) {
			::before {
				content: '';
				display: block;
				width: 1px;
				height: 23px;
				position: absolute;
				bottom: -4px;
				left: 0;
				background-color: ${palette.neutral[100]};
				opacity: 0.5;
				margin-right: ${space[1]}px;
			}
			position: relative;
			padding-left: ${space[1]}px;
		}
	}
`;

const galleryMetaStyles = css`
	margin-left: ${space[1]}px;
	display: flex;
	gap: ${space[1]}px;
	align-items: center;
`;

const galleryIconContainerStyles = css`
	display: flex;
	fill: ${palette.neutral[100]};
	svg {
		top: 0px;
		left: 0px;
		height: 14px;
		width: 14px;
	}
`;

type Props = {
	format: ArticleFormat;
	showLivePlayable: boolean;
	age?: JSX.Element;
	commentCount?: JSX.Element;
	cardBranding?: JSX.Element;
	mediaType?: MainMedia['type'];
	galleryCount?: number;
};

export const CardFooter = ({
	format,
	age,
	commentCount,
	cardBranding,
	showLivePlayable,
	mediaType,
	galleryCount,
}: Props) => {
	if (showLivePlayable) return null;

	if (format.theme === ArticleSpecial.Labs && cardBranding) {
		return <footer css={labStyles}>{cardBranding}</footer>;
	}

	if (mediaType === 'Gallery') {
		return (
			<footer css={galleryContentStyles}>
				<div>Gallery</div>
				<div css={galleryMetaStyles}>
					{galleryCount}
					<span css={galleryIconContainerStyles}>
						<CameraSvg />
					</span>
				</div>
			</footer>
		);
	}

	return (
		<footer css={contentStyles}>
			{age}
			{commentCount}
		</footer>
	);
};
