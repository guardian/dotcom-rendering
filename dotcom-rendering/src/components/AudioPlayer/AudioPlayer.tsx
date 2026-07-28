import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { getAudioData } from '../../lib/audio-data';
import { palette } from '../../palette';
import type { FEElement } from '../../types/content';
import { AudioPlayerApps } from '../AudioPlayerApps.island';
import { AudioPlayerWeb } from '../AudioPlayerWeb.island';
import { useConfig } from '../ConfigContext';
import { Island } from '../Island';
import { formatAudioDuration } from '../ListenToArticle.island';

export const AudioPlayer = ({
	element,
	isSensitive,
	isAcastEnabled,
}: {
	element: FEElement;
	isSensitive: boolean;
	isAcastEnabled: boolean;
}) => {
	const { renderingTarget } = useConfig();
	const isApps = renderingTarget === 'Apps';
	const audioData = getAudioData([element]);
	if (!audioData) return <></>;
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
