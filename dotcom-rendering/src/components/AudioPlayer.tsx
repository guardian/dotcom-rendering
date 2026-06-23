import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { palette } from '../palette';
import { AppsAudioPlayer } from './AppsAudioPlayer.island';
import { AudioPlayerWrapper } from './AudioPlayerWrapper.island';
import { formatAudioDuration } from './ListenToArticle.island';

export const AudioPlayer = ({
	audioData,
	isSensitive,
	isAcastEnabled,
	isApps,
}: {
	audioData: {
		audioDownloadUrl: string;
		durationSeconds?: number;
		mediaId: string;
	};
	isSensitive: boolean;
	isAcastEnabled: boolean;
	isApps: boolean;
}) => {
	return (
		<>
			{isApps ? (
				<AppsAudioPlayer
					audioDuration={
						typeof audioData.durationSeconds === 'number'
							? formatAudioDuration(audioData.durationSeconds)
							: undefined
					}
				/>
			) : (
				<AudioPlayerWrapper
					contentIsNotSensitive={!isSensitive}
					isAcastEnabled={isAcastEnabled}
					src={audioData.audioDownloadUrl}
					mediaId={audioData.mediaId}
				/>
			)}
			<StraightLines
				cssOverrides={css`
					display: block;
					margin-bottom: ${space[2]}px;
				`}
				count={1}
				color={palette('--straight-lines')}
			/>
		</>
	);
};
