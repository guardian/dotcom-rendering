import { css } from '@emotion/react';
import { from, palette } from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { TagType } from '../types/tag';
import { PodcastMeta } from './PodcastMeta';

const format: ArticleFormat = {
	design: ArticleDesign.Audio,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const podcastSeries: TagType = {
	id: 'lifeandstyle/series/comforteatingwithgracedent',
	type: 'Series',
	title: 'Comfort Eating with Grace Dent',
	podcast: {
		subscriptionUrl:
			'https://podcasts.apple.com/gb/podcast/comfort-eating-with-grace-dent/id1571446706',
		spotifyUrl:
			'https://open.spotify.com/show/5fMtMMKSlUoDuxhd3a3IS0?si=3B38GpeFThy4YtxSyNxApA&dl_branch=1',
		image: 'https://uploads.guim.co.uk/2023/09/18/GD_ComfortEating_3000x3000.jpg',
	},
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			background-color: ${palette.neutral[7]};
			margin: 20px;
			${from.leftCol} {
				width: 140px;
			}
			${from.wide} {
				width: 219px;
			}
		`}
	>
		{children}
	</div>
);

export const Default = () => (
	<div
		css={css`
			width: 100%;
			height: 100%;
			background-color: ${palette.neutral[7]};
		`}
	>
		<Wrapper>
			<PodcastMeta
				series={podcastSeries}
				format={format}
				spotifyUrl="#"
				subscriptionUrl="#"
				rssFeedUrl="#"
				audioDownloadUrl="#"
			/>
		</Wrapper>
	</div>
);

export default {
	component: PodcastMeta,
	title: 'Components/PodcastMeta',
	parameters: {
		formats: [
			{
				design: ArticleDesign.Audio,
				display: ArticleDisplay.Standard,
			},
		],
	},
};
