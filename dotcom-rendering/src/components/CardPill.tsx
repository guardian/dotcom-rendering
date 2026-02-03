import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgCamera } from '@guardian/source/react-components';
import type { ArticleFormat } from '../lib/articleFormat';
import { ArticleDesign } from '../lib/articleFormat';
import { secondsToDuration } from '../lib/formatTime';
import { palette } from '../palette';
import type { MainMedia } from '../types/mainMedia';
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
	mainMedia?: MainMedia;
	isNewsletter?: boolean;
};

export const CardPill = ({
	format,
	mainMedia,
	isNewsletter,
}: CardPillProps) => {
	if (isNewsletter) return <Pill content="Newsletter" />;
	if (!mainMedia) return null;
	switch (mainMedia.type) {
		case 'Gallery':
			return (
				<Pill
					content={mainMedia.count}
					icon={<SvgCamera />}
					prefix="Gallery"
				/>
			);
		case 'Audio':
			return (
				<Pill
					content={mainMedia.duration}
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Podcast"
				/>
			);
		case 'YoutubeVideo':
			if (ArticleDesign.Video !== format.design) return null;
			if (mainMedia.duration === 0) {
				return (
					<Pill
						content="Live"
						icon={<div css={liveBulletStyles} />}
					/>
				);
			}
			return (
				<Pill
					content={secondsToDuration(mainMedia.duration)}
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Video"
				/>
			);

		case 'SelfHostedVideo':
			switch (format.design) {
				case ArticleDesign.Video:
					return (
						<Pill
							content=""
							icon={<SvgMediaControlsPlay width={18} />}
							prefix="Video"
						/>
					);
				case ArticleDesign.Audio:
					return (
						<Pill
							content=""
							icon={<SvgMediaControlsPlay width={18} />}
							prefix="Podcast"
						/>
					);
				case ArticleDesign.Gallery:
					return (
						<Pill
							content=""
							icon={<SvgCamera />}
							prefix="Gallery"
						/>
					);
				default:
					return null;
			}
		default:
			return null;
	}
};
