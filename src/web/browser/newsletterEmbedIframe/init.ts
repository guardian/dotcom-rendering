import '../webpackPublicPath';
import { startup } from '@root/src/web/browser/startup';

const init = (): Promise<void> => {
    const allIframes: HTMLIFrameElement[] = [].slice.call(
        document.querySelectorAll('.email-sub__iframe'),
    );
    type newsletterHeightEvent = { source: { location: { href: string } } };

    window.addEventListener('message', (event) => {
        const iframes: HTMLIFrameElement[] = allIframes.filter((i) => {
            try {
                return (
                    i.src ===
                    (event as newsletterHeightEvent).source.location.href
                );
            } catch (e) {
                return false;
            }
        });
        if (iframes.length !== 0) {
            try {
                const message = JSON.parse(event.data);
                switch (message.type) {
                    case 'set-height':
                        iframes.forEach((iframe) => {
                            iframe.height = message.value;
                        });
                        break;
                    default:
                }
                // eslint-disable-next-line no-empty
            } catch (e) {}
        }
    });

    return Promise.resolve();
};

startup('newsletterEmbedIframe', null, init);
