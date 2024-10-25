import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import type { TagType } from '../types/tag';
import { Picture } from './Picture';

const podcastResponsiveCoverImage = css`
	img {
		width: 140px;
		height: 140px;
	}
	margin-bottom: 0.375rem;
	${from.wide} {
		img {
			width: 219px;
			height: 219px;
		}
	}
`;

export const PodcastCoverImage = ({
	format,
	series,
}: {
	format: ArticleFormat;
	series: TagType;
}) => {
	return (
		<div css={podcastResponsiveCoverImage}>
			<Picture
				role={'podcastCover'}
				format={format}
				master={series.podcast?.image ?? ''}
				alt={series.title}
				height={1}
				width={1}
				loading="lazy"
			/>
		</div>
	);
};
