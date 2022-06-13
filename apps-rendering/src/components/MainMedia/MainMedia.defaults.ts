// ----- Config ----- //

/**
 * Used to connect a caption to the main media for screen readers.
 *
 * In immersives the caption for the main media is rendered further down the
 * page. We give that caption an id and use `aria-labelledby` on the main media
 * `figure` so that screen readers can connect the two.
 */
const immersiveCaptionId = 'immersive-main-media';

// ----- Exports ----- //

export { immersiveCaptionId };
