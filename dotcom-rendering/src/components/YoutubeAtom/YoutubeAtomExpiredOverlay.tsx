import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { body, palette, space } from '@guardian/source/foundations';
import { SvgAlertRound } from '@guardian/source/react-components';
import { Caption } from '../Caption';

type Props = {
	format: ArticleFormat;
	hideCaption?: boolean;
	isMainMedia?: boolean;
	mediaTitle?: string;
	overrideImage?: string;
};

const expiredOverlayStyles = (overrideImage?: string) =>
	overrideImage
		? css`
				height: 0px;
				position: relative;
				background-image: url(${overrideImage});
				background-size: cover;
				background-position: 49% 49%;
				background-repeat: no-repeat;
				padding-bottom: 56%;
				color: ${palette.neutral[100]};
				background-color: ${palette.neutral[20]};
		  `
		: undefined;

const expiredTextWrapperStyles = css`
	display: flex;
	flex-direction: row;
	align-items: center;

	padding-top: ${space[4]}px;
	padding-bottom: ${space[4]}px;
	padding-left: ${space[1]}px;
	padding-right: ${space[12]}px;
	color: ${palette.neutral[100]};
	background-color: ${palette.neutral[20]};
`;

const expiredSVGWrapperStyles = css`
	padding-right: ${space[1]}px;
	svg {
		width: ${space[12]}px;
		height: ${space[12]}px;
		fill: ${palette.neutral[100]};
	}
`;

export const YoutubeAtomExpiredOverlay = ({
	format,
	hideCaption,
	isMainMedia,
	mediaTitle,
	overrideImage,
}: Props) => {
	return (
		<figure
			css={css`
				margin-top: 16px;
				margin-bottom: 16px;
			`}
		>
			<div css={expiredOverlayStyles(overrideImage)}>
				<div css={expiredTextWrapperStyles}>
					<div css={expiredSVGWrapperStyles}>
						<SvgAlertRound />
					</div>
					<p
						css={css`
							${body.medium({
								lineHeight: 'tight',
							})}
						`}
					>
						This video has been removed. This could be because it
						launched early, our rights have expired, there was a
						legal issue, or for another reason.
					</p>
				</div>
			</div>
			{!hideCaption && (
				<Caption
					captionText={mediaTitle ?? ''}
					format={format}
					displayCredit={false}
					mediaType="Video"
					isMainMedia={isMainMedia}
				/>
			)}
		</figure>
	);
};
