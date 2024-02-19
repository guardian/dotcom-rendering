import { loadScript, log } from '@guardian/libs';

let scriptsPromise: Promise<Array<Event | undefined | void>> | undefined;
let youTubeAPIPromise: Promise<typeof YT> | undefined;

const loadScriptAndCatch = (src: string) =>
	loadScript(src).catch((e) => {
		log('dotcom', `loadYouTubeAPI: failed to load script ${src}`, e);
	});

const loadScripts = (enableIma = false) => {
	/**
	 * loadScripts can be called multiple times on pages with more than one video
	 * Only attempt to load scripts if this is the first call and otherwise return the same promise
	 */
	if (scriptsPromise) {
		return scriptsPromise;
	}
	let scripts;
	if (enableIma) {
		log('dotcom', 'loadYouTubeAPI: loading YouTube & IMA script');
		scripts = [
			loadScriptAndCatch('https://www.youtube.com/iframe_api?ima=1'),
			loadScriptAndCatch(
				'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
			),
		];
	} else {
		log('dotcom', 'loadYouTubeAPI: loading YouTube script');
		scripts = [loadScriptAndCatch('https://www.youtube.com/iframe_api')];
	}
	scriptsPromise = Promise.all(scripts);
	return scriptsPromise;
};

/**
 * The YouTube IFrame API will call `window.onYouTubeIframeAPIReady` when it is ready
 */
const getYouTubeAPIPromise = (): Promise<typeof YT> => {
	/**
	 * youtubeAPIReady can be called multiple times on pages with more than one video
	 * Only set window.onYouTubeIframeAPIReady if this is the first call and otherwise return the same promise
	 */
	if (youTubeAPIPromise) {
		return youTubeAPIPromise;
	}

	youTubeAPIPromise = new Promise((resolve) => {
		window.onYouTubeIframeAPIReady = () => {
			log('dotcom', 'loadYouTubeAPI: resolving YouTube API promise');
			resolve(window.YT);
		};
	});
	return youTubeAPIPromise;
};

const loadYouTubeAPI = (enableIma = false): Promise<typeof YT> => {
	/* If another part of the code has already loaded youtube api, return early. */
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- @types/youtube insists that window.YT cannot be undefined. This is very much untrue.
	if (window.YT?.Player instanceof Function) {
		log('dotcom', 'loadYouTubeAPI: returning existing window.YT');
		return Promise.resolve(window.YT);
	}

	/* Create youtubeAPI promise before loading scripts so that
	 * window.onYouTubeIframeAPIReady is guaranteed to be defined
	 * when the YouYube script laods and calls it.
	 */
	const youtubeAPI = getYouTubeAPIPromise();

	return loadScripts(enableIma).then(() => youtubeAPI);
};

export { loadYouTubeAPI };
