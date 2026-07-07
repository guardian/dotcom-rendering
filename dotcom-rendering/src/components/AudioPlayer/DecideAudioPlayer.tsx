import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { palette } from '../../palette';
import { AppsAudioPlayer } from '../AppsAudioPlayer.island';
import { AudioPlayerWrapper } from '../AudioPlayerWrapper.island';
import { Island } from '../Island';
import { formatAudioDuration } from '../ListenToArticle.island';

export const DecideAudioPlayer = ({
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
			<Island priority="critical" defer={{ until: 'visible' }}>
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
			</Island>
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
