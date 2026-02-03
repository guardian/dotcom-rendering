import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSansBold12,
} from '@guardian/source/foundations';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../../../lib/articleFormat';
import type { CardFooterMedia, MainMedia } from '../../../types/mainMedia';
import { CardPill } from '../../CardPill';

const contentStyles = css`
	margin-top: auto;
	padding-top: ${space[1]}px;
	display: flex;
	justify-content: flex-start;
	width: fit-content;
	align-items: center;
	${textSansBold12}
	> {
		/* The dividing line is applied only to the second child. This ensures that no
		   dividing line is added when there is only one child in the container. */
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

const reserveSpaceStyles = (mobile: boolean, desktop: boolean) => css`
	min-height: ${mobile ? '14px' : 0};

	${from.tablet} {
		min-height: ${desktop ? '14px' : 0};
	}
`;

const labStyles = css`
	margin-top: ${space[1]}px;
`;
type Props = {
	format: ArticleFormat;
	showLivePlayable: boolean;
	age?: JSX.Element;
	commentCount?: JSX.Element;
	cardBranding?: JSX.Element;
	mainMedia?: MainMedia | CardFooterMedia;
	isNewsletter?: boolean;
	shouldReserveSpace?: { mobile: boolean; desktop: boolean };
	isStorylines?: boolean;
	hidePill?: boolean;
};

export const CardFooter = ({
	format,
	showLivePlayable,
	age,
	commentCount,
	cardBranding,
	mainMedia,
	isNewsletter,
	shouldReserveSpace,
	isStorylines,
	hidePill = false,
}: Props) => {
	if (showLivePlayable) return null;

	const shouldShowBranding =
		format.theme === ArticleSpecial.Labs && !!cardBranding;

	const shouldShowPill =
		!hidePill &&
		(mainMedia?.type === 'YoutubeVideo' ||
			mainMedia?.type === 'Audio' ||
			mainMedia?.type === 'Gallery' ||
			mainMedia?.type === 'SelfHostedVideo' ||
			isNewsletter);

	if (shouldShowPill) {
		return (
			<footer css={contentStyles}>
				{shouldShowBranding && cardBranding}
				{isStorylines && age}
				<CardPill
					format={format}
					isNewsletter={isNewsletter}
					mainMedia={mainMedia}
					isVideoArticle={format.design === ArticleDesign.Video}
				/>
			</footer>
		);
	}

	if (shouldShowBranding) {
		return <footer css={labStyles}>{cardBranding}</footer>;
	}

	return (
		<footer
			css={[
				contentStyles,
				shouldReserveSpace &&
					reserveSpaceStyles(
						shouldReserveSpace.mobile,
						shouldReserveSpace.desktop,
					),
			]}
		>
			{age}
			{commentCount}
		</footer>
	);
};
