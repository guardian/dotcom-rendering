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
	);
};
