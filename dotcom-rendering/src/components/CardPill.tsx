import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgCamera } from '@guardian/source/react-components';
import type { ArticleFormat } from '../lib/articleFormat';
import { ArticleDesign } from '../lib/articleFormat';
import { secondsToDuration } from '../lib/formatTime';
import { palette } from '../palette';
import type { ArticleMedia } from '../types/mainMedia';
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
	media?: ArticleMedia;
	isNewsletter?: boolean;
};

export const CardPill = ({ format, media, isNewsletter }: CardPillProps) => {
	if (isNewsletter) return <Pill content="Newsletter" />;
	if (!media) return null;

	switch (media.type) {
		case 'Gallery':
			return (
				<Pill
					content={media.count}
					icon={<SvgCamera />}
					prefix="Gallery"
				/>
			);
		case 'Audio':
			return (
				<Pill
					content={media.duration}
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Podcast"
				/>
			);
		case 'YoutubeVideo':
			if (format.design !== ArticleDesign.Video) return null;
			if (media.isLive) {
				return (
					<Pill
						content="Live"
						icon={<div css={liveBulletStyles} />}
					/>
				);
			}
			return (
				<Pill
					content={secondsToDuration(media.duration)}
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Video"
				/>
			);
		case 'SelfHostedVideo':
			if (format.design !== ArticleDesign.Video) return null;
			return (
				<Pill
					content={secondsToDuration(media.duration)}
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Video"
				/>
			);
	}
};
