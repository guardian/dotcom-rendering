import { css } from '@emotion/react';
import {
	articleBold17,
	from,
	space,
	textSans14,
} from '@guardian/source/foundations';
import { LinkButton, SvgDownload } from '@guardian/source/react-components';
import type { ReactElement } from 'react';
import { palette as themePalette } from '../palette';
import type { Podcast } from '../types/tag';

type PodcastButtonProps = {
	label: string;
	url: string;
	icon?: ReactElement;
};

const SvgSpotify = () => (
	<svg width="15" height="12" viewBox="0 0 15 12">
		<path
			d="M14.277 2.13A18.575 18.575 0 0 0 5.653.032c-1.57 0-3.14.2-4.668.588-.5.13-.81.763-.684 1.284.124.52.635.839 1.135.71a16.906 16.906 0 0 1 4.223-.528c2.732 0 5.344.632 7.782 1.888a.88.88 0 0 0 .408.104c.353 0 .686-.295.853-.64.225-.478.04-1.068-.425-1.31zM5.653 8.282c-1.27 0-2.522.198-3.725.58-.374.121-.584.945-.466 1.326a.7.7 0 0 0 .885.486 10.634 10.634 0 0 1 3.306-.521c1.885 0 3.755.494 5.392 1.44l.342.086c.25 0 .494-.14.618-.382.184-.346.066-1.204-.276-1.404a12.343 12.343 0 0 0-6.076-1.61zm7.303-2.14a15.433 15.433 0 0 0-7.297-1.846c-1.419 0-2.83.19-4.182.579-.443.122-.701.903-.575 1.353.117.46.568.728 1.01.597 1.21-.346 2.48-.52 3.747-.52 2.307 0 4.51.555 6.547 1.656.117.069.25.095.376.095.3 0 .583-.477.727-.763a.874.874 0 0 0-.353-1.151z"
			fill="#FFF"
			fillRule="evenodd"
		></path>
	</svg>
);

const ApplePodcastsSvg = () => (
	<svg width="14" height="15" viewBox="0 0 18 20">
		<g fill="#FFF">
			<path d="M11.84 17.624c.027-.282.066-.522.07-.763.006-.38.223-.543.54-.705 2.289-1.172 3.742-3.018 4.25-5.56.489-2.453-.091-4.672-1.666-6.596-1.241-1.515-2.85-2.442-4.793-2.744-2.364-.366-4.48.23-6.3 1.77-1.477 1.25-2.4 2.851-2.69 4.788-.366 2.435.261 4.585 1.85 6.457a7.615 7.615 0 0 0 2.497 1.915c.272.133.49.252.475.608-.009.204.055.41.08.617.022.18-.05.215-.217.153a8.877 8.877 0 0 1-2.486-1.392C1.783 14.84.7 13.128.228 11.037a8.801 8.801 0 0 1-.143-3.133c.215-1.613.8-3.062 1.789-4.346C3.181 1.861 4.873.76 6.95.252A8.436 8.436 0 0 1 9.94.053c1.74.202 3.308.837 4.678 1.948 1.639 1.331 2.71 3.03 3.155 5.093.575 2.667.047 5.127-1.55 7.336-1.077 1.492-2.507 2.526-4.228 3.155-.021.01-.045.014-.155.04Z"></path>
			<path d="M6.809 13.403c0-.243-.024-.489.005-.728.056-.463.321-.787.72-1.017a2.778 2.778 0 0 1 1.375-.36c.632-.01 1.23.107 1.756.498.35.26.515.608.532 1.026.039 1.006-.047 2.003-.19 2.996-.132.913-.268 1.824-.408 2.736-.088.575-.319 1.047-.918 1.241-.655.213-1.275.159-1.834-.266-.292-.22-.378-.566-.435-.9-.15-.9-.293-1.802-.407-2.709-.106-.835-.17-1.676-.25-2.515l.054-.002Z"></path>
			<path d="M15.025 9.006c-.047 2.097-.873 3.729-2.484 4.956-.072.055-.171.072-.258.106-.011-.087-.022-.174-.035-.261-.105-.7.15-1.223.617-1.761.785-.904 1.095-2.034 1.029-3.23a4.935 4.935 0 0 0-4.039-4.598c-2.615-.47-5.1 1.267-5.636 3.835-.359 1.725.138 3.231 1.341 4.5.145.15.212.295.2.506-.014.266.018.535.02.803a.84.84 0 0 1-.05.205c-.065-.021-.14-.029-.194-.067-1.313-.943-2.136-2.208-2.436-3.805-.319-1.717.022-3.303 1.057-4.707 1.008-1.37 2.357-2.197 4.05-2.42 1.691-.223 3.21.196 4.538 1.258 1.239.989 1.983 2.284 2.203 3.869.043.288.056.58.077.81Z"></path>
			<path d="M9.008 6.236c.555-.01 1.09.207 1.482.602.391.395.606.933.595 1.491-.01 1.255-.988 2.102-2.118 2.084-1.113-.018-2.053-.865-2.05-2.1a2.057 2.057 0 0 1 .606-1.487c.395-.392.931-.605 1.486-.59Z"></path>
		</g>
	</svg>
);

const podcastTitleStyles = css`
	color: ${themePalette('--podcast-meta-title')};
	${articleBold17};
	padding: ${space[2]}px 0;
`;

const podcastButtonStyles = css`
	color: ${themePalette('--podcast-meta-button-text')};
	background-color: ${themePalette('--podcast-meta-button-background')};
	margin-right: ${space[3]}px;
	margin-bottom: ${space[3]}px;
	${textSans14};

	svg {
		width: auto;
	}

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

const podcastButtonListStyles = css`
	display: inline-flex;
	flex-wrap: wrap;

	${from.leftCol} {
		display: block;
	}
`;

const PodcastButton = ({ label, url, icon }: PodcastButtonProps) => (
	<li>
		<LinkButton
			size="small"
			href={url}
			cssOverrides={podcastButtonStyles}
			icon={icon}
		>
			{label}
		</LinkButton>
	</li>
);

interface PodcastMetaProps extends Podcast {
	rssFeedUrl?: string;
	audioDownloadUrl?: string;
}

export const PodcastMeta = ({
	subscriptionUrl,
	spotifyUrl,
	rssFeedUrl,
	audioDownloadUrl,
}: PodcastMetaProps) => {
	return (
		<>
			<div css={podcastTitleStyles}>More ways to listen</div>
			<ul css={podcastButtonListStyles}>
				{!!subscriptionUrl && (
					<PodcastButton
						icon={<ApplePodcastsSvg />}
						label={'Apple podcasts'}
						url={subscriptionUrl}
					/>
				)}
				{!!spotifyUrl && (
					<PodcastButton
						icon={<SvgSpotify />}
						label={'Spotify'}
						url={spotifyUrl}
					/>
				)}
				{!!rssFeedUrl && (
					<PodcastButton label={'RSS Feed'} url={rssFeedUrl} />
				)}
				{!!audioDownloadUrl && (
					<PodcastButton
						icon={<SvgDownload size="small" />}
						label={'Download'}
						url={audioDownloadUrl}
					/>
				)}
			</ul>
		</>
	);
};
