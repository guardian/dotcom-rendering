import { MediaEvent } from '@guardian/bridget';
import { isUndefined, log } from '@guardian/libs';
import type { EventPayload, VideoEvent } from '@guardian/ophan-tracker-js';
import { getOphan } from '../../client/ophan/ophan';
import { getVideoClient } from '../../lib/bridgetApi';
import type { VideoEventKey } from './YoutubeAtom';

const getAppsMediaEvent = (
	trackingEvent: VideoEventKey,
): MediaEvent | undefined => {
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
			return undefined;
	}
};

const ophanTrackerWeb = (id: string) => {
	return (trackingEvent: VideoEventKey): void => {
		void getOphan('Web').then((ophan) => {
			const event = {
				video: {
					id: `gu-video-youtube-${id}`,
					eventType: `video:content:${trackingEvent}`,
				} satisfies VideoEvent,
			} satisfies EventPayload;
			log('dotcom', {
				from: 'YoutubeAtom event emitter web',
				id,
				event,
			});
			ophan.record(event);
		});
	};
};

const ophanTrackerApps = (id: string) => {
	return (trackingEvent: VideoEventKey): void => {
		const appsMediaEvent = getAppsMediaEvent(trackingEvent);
		if (!isUndefined(appsMediaEvent)) {
			const event = {
				videoId: id,
				event: appsMediaEvent,
			};
			log('dotcom', {
				from: 'YoutubeAtom event emitter apps',
				id,
				event,
			});
			void getVideoClient().sendVideoEvent(event);
		}
	};
};

export { ophanTrackerApps, ophanTrackerWeb };
