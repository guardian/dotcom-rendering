import { loadScript, log } from '@guardian/libs';

let scriptsPromise: Promise<Array<Event | undefined>> | undefined;
let youtubeAPIReadyPromise: Promise<typeof YT> | undefined;

const loadScripts = (enableIma = false) => {
	/**
	 * Since loadScripts can be called multiple times on the same page for pages with more than one video,
	 * only attempt to load the scripts if this is the first call and otherwise return the same promise.
	 */
	if (scriptsPromise) {
		return scriptsPromise;
	}
	let scripts;
	if (enableIma) {
		log('dotcom', 'loadYouTubeAPI: loading YT & IMA script');
		scripts = [
			/**
			 * The IMA version of the iframe api script can only be fetched from
			 * a domain that is on YouTube's allow list (theguardian.com, thegulocal.com, gutools.co.uk).
			 * If the request is made from a domain that isn't on the list (e.g. localhost),
			 * the standard, non-IMA version will be returned and IMA functionality will fail silently.
			 */
			loadScript('https://www.youtube.com/iframe_api?ima=1'),
			loadScript('//imasdk.googleapis.com/js/sdkloader/ima3.js'),
		];
	} else {
		log('dotcom', 'loadYouTubeAPI: loading YT script');
		scripts = [loadScript('https://www.youtube.com/iframe_api')];
	}
	scriptsPromise = Promise.all(scripts);
	return scriptsPromise;
};

/**
 * The YouTube IFrame API will call `window.onYouTubeIframeAPIReady`
 * when it has downloaded and is ready
 */
const youtubeAPIReady = () => {
	/**
	 * Since youtubeAPIReady can be called multiple times on the same page for pages with more than one video,
	 * only overwrite window.onYouTubeIframeAPIReady if this is the first call and return the same promise otherwise.
	 */
	if (youtubeAPIReadyPromise) {
		return youtubeAPIReadyPromise;
	}

	youtubeAPIReadyPromise = new Promise((resolve) => {
		window.onYouTubeIframeAPIReady = () => {
			log('dotcom', 'loadYouTubeAPI: resolving YTAPI promise');
			resolve(window.YT);
		};
	});
	return youtubeAPIReadyPromise;
};

const loadYouTubeAPI = (enableIma = false): Promise<typeof YT> => {
	/* If another part of the code has already loaded youtube api, return early. */
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- @types/youtube insists that window.YT cannot be undefined. This is very much untrue.
	if (window.YT?.Player instanceof Function) {
		log('dotcom', 'loadYouTubeAPI: returning window.YT');
		return Promise.resolve(window.YT);
	}

	/* Create youtubeAPIReady promise before loading scripts so that
	 * window.onYouTubeIframeAPIReady is guaranteed to be defined
	 * by the time the youtube script calls it.
	 */
	const youtubeAPI = youtubeAPIReady();

	return loadScripts(enableIma).then(() => {
		return youtubeAPI;
	});
};

export { loadYouTubeAPI };
