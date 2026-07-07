import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { palette } from '../../palette';
import { AudioPlayerApps } from '../AudioPlayerApps.island';
import { AudioPlayerWeb } from '../AudioPlayerWeb.island';
import { Island } from '../Island';
import { formatAudioDuration } from '../ListenToArticle.island';

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
			<Island priority="critical" defer={{ until: 'visible' }}>
				{isApps ? (
					<AudioPlayerApps
						audioDuration={
							typeof audioData.durationSeconds === 'number'
								? formatAudioDuration(audioData.durationSeconds)
								: undefined
						}
					/>
				) : (
					<AudioPlayerWeb
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
