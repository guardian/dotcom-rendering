const notEmpty = (value: string | null): value is string => value !== null;

export const extractScripts: (
    elements: GenericElement[],
    mainMediaElements: GenericElement[],
) => string[] = (elements, mainMediaElements) => {
    const capiElements = elements as CAPIElement[];

    return [
        ...new Set([...capiElements, ...mainMediaElements].map(e => e._type)),
    ]
        .map(t => {
            switch (t) {
                case 'model.dotcomrendering.pageElements.TweetBlockElement':
                    return `<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>`;
                case 'model.dotcomrendering.pageElements.InstagramBlockElement':
                    return `<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>`;
                case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
                    return `<script async custom-element="amp-soundcloud" src="https://cdn.ampproject.org/v0/amp-soundcloud-0.1.js"></script>`;
                case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
                    return `<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>`;
                case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
                    return `<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>`;
                case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
                    return `<script async custom-element="amp-vimeo" src="https://cdn.ampproject.org/v0/amp-vimeo-0.1.js"></script>`;
                case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
                    return `<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>`;
                case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
                    return `<script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>`;
                default:
                    return null;
            }
        })
        .filter(notEmpty) as string[];
};
