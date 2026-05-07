import { MediaEvent } from '@guardian/bridget';
import { isUndefined, log } from '@guardian/libs';
import type { EventPayload, VideoEvent } from '@guardian/ophan-tracker-js';
import { getOphan } from '../../client/ophan/ophan';
import { getVideoClient } from '../../lib/bridgetApi';
import { hasMinimumBridgetVersion } from '../../lib/useIsBridgetCompatible';
import type { VideoEventKey } from './YoutubeAtom';

const getAppsMediaEvent = async (
	trackingEvent: VideoEventKey,
): Promise<MediaEvent | undefined> => {
	switch (trackingEvent) {
		case 'cued':
			return MediaEvent.ready;
		case 'play':
			return MediaEvent.play;
		case '25':
			return MediaEvent.percent25;
		case '50':
			return MediaEvent.percent50;
		case '75':
			return MediaEvent.percent75;
		case 'end':
			return MediaEvent.end;
		default:
	}

	if (await hasMinimumBridgetVersion('8.9.2')) {
		switch (trackingEvent) {
			case 'pause':
				return MediaEvent.pause;
			case 'mute':
				return MediaEvent.mute;
			case 'unmute':
				return MediaEvent.unmute;
			case 'enter_fullscreen':
				return MediaEvent.enter_fullscreen;
			case 'exit_fullscreen':
				return MediaEvent.exit_fullscreen;
			case 'view':
				return MediaEvent.view;
			default:
		}
	}

	return undefined;
};

export type OphanVideoStyle = 'youtube' | 'loop' | 'cinemagraph' | 'default';

const ophanTrackerWeb = (id: string, videoStyle: OphanVideoStyle) => {
	return (trackingEvent: VideoEventKey): void => {
		void getOphan('Web').then((ophan) => {
			const event = {
				video: {
					id: `gu-video-${videoStyle}-${id}`,
					eventType: `video:content:${trackingEvent}`,
				} satisfies VideoEvent,
			} satisfies EventPayload;
			log('dotcom', {
				from: `${videoStyle}Atom event emitter web`,
				id,
				event,
			});
			ophan.record(event);
		});
	};
};

const ophanTrackerApps = (id: string, videoStyle: OphanVideoStyle) => {
	return (trackingEvent: VideoEventKey): void => {
		void getAppsMediaEvent(trackingEvent).then((appsMediaEvent) => {
			if (!isUndefined(appsMediaEvent)) {
				const event = {
					videoId: id,
					event: appsMediaEvent,
				};
				log('dotcom', {
					from: `${videoStyle}Atom event emitter apps`,
					id,
					event,
				});
				void getVideoClient().sendVideoEvent(event);
			}
		});
	};
};

export { ophanTrackerApps, ophanTrackerWeb };
