import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgCamera } from '@guardian/source/react-components';
import type { ArticleFormat } from '../lib/articleFormat';
import { ArticleDesign } from '../lib/articleFormat';
import { secondsToDuration } from '../lib/formatTime';
import { palette } from '../palette';
import type { ArticleMediaMetadata } from '../types/mainMedia';
import { Pill } from './Pill';
import { SvgMediaControlsPlay } from './SvgMediaControlsPlay';

const liveBulletStyles = css`
	width: 9px;
	height: 9px;
	border-radius: 50%;
	background-color: ${palette('--pill-bullet')};
	margin-right: ${space[1]}px;
`;

type CardPillProps = {
	format: ArticleFormat;
	mediaMetadata?: ArticleMediaMetadata;
	isNewsletter?: boolean;
};

export const CardPill = ({
	format,
	mediaMetadata,
	isNewsletter,
}: CardPillProps) => {
	if (isNewsletter) return <Pill content="Newsletter" />;
	if (!mediaMetadata) return null;
	switch (mediaMetadata.type) {
		case 'Gallery':
			return (
				<Pill
					content={mediaMetadata.count}
					icon={<SvgCamera />}
					prefix="Gallery"
				/>
			);
		case 'Audio':
			return (
				<Pill
					content={mediaMetadata.duration}
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Podcast"
				/>
			);
		case 'YoutubeVideo':
			if (ArticleDesign.Video !== format.design) return null;
			if (mediaMetadata.isLive) {
				return (
					<Pill
						content="Live"
						icon={<div css={liveBulletStyles} />}
					/>
				);
			}
			return (
				<Pill
					content={secondsToDuration(mediaMetadata.duration)}
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Video"
				/>
			);
		case 'SelfHostedVideo':
			if (ArticleDesign.Video !== format.design) return null;
			return (
				<Pill
					content={secondsToDuration(mediaMetadata.duration)}
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Video"
				/>
			);
	}
};
