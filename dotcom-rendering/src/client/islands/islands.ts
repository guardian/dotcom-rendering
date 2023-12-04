import { getEmotionCache } from './emotion';
import { initHydration } from './initHydration';

export const islands = async (): Promise<void> => {
	// Get the emotion cache which is shared between islands
	const emotionCache = getEmotionCache();
	const elements = document.querySelectorAll<HTMLElement>('gu-island');
	await Promise.all(
		[...elements].map((element) => initHydration(element, emotionCache)),
	);
};
