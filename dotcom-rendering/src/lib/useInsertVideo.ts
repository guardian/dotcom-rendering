import type { VideoSlot } from '@guardian/bridget/VideoSlot';
import { useEffect } from 'react';
import { getVideoClient } from './bridgetApi';

export const useInsertVideo = (videoSlots: VideoSlot[]): void => {
	useEffect(() => {
		if (videoSlots.length > 0) {
			void getVideoClient().insertVideos(videoSlots);
		}
	}, [videoSlots]);
};
