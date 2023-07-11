/* eslint-disable no-underscore-dangle -- TODO */
import { loadScript, log } from '@guardian/libs';

declare global {
	interface Window {
		onYouTubeIframeAPIReady: () => void;
	}
}

let _scriptsPromise: Promise<Array<Event | undefined>>;
let _youtubeAPIReadyPromise: Promise<typeof YT>;

const loadScripts = (enableIma = false) => {
	/**
	 * Since loadScripts can be called multiple times on the same page for pages with more than one video,
	 * only attempt to load the scripts if this is the first call and return the same promise otherwise.
	 */
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- TODO
	if (_scriptsPromise) {
		return _scriptsPromise;
	}
	let scripts;
	if (enableIma) {
		log('dotcom', 'loadYT: loading YT & IMA script');
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
		log('dotcom', 'loadYT: loading YT script');
		scripts = [loadScript('https://www.youtube.com/iframe_api')];
	}
	_scriptsPromise = Promise.all(scripts);
	return _scriptsPromise;
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
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- TODO
	if (_youtubeAPIReadyPromise) {
		return _youtubeAPIReadyPromise;
	}

	_youtubeAPIReadyPromise = new Promise((resolve) => {
		window.onYouTubeIframeAPIReady = () => {
			log('dotcom', 'loadYT: resolving YTAPI promise');
			resolve(window.YT);
		};
	});
	return _youtubeAPIReadyPromise;
};

const loadYouTubeAPI = (enableIma = false): Promise<typeof YT> => {
	/* If another part of the code has already loaded youtube api, return early. */
	if (window.YT.Player instanceof Function) {
		log('dotcom', 'loadYT: returning window.YT');
		return Promise.resolve(window.YT);
	}

	/* Create youtubeAPIReady promise before loading scripts so that
	 * window.onYouTubeIframeAPIReady is guaranteed to be defined
	 * by the time the youtube script calls it.
	 */
	const youtubeAPIReadyPromise = youtubeAPIReady();

	return loadScripts(enableIma).then(() => {
		return youtubeAPIReadyPromise;
	});
};

export { loadYouTubeAPI };
