// ----- Imports ----- //

import { commercialClient, userClient, notificationsClient, galleryClient, acquisitionsClient } from 'native/nativeApi';
import { AdSlot } from 'bridget-typescript/AdSlot'
import { Topic } from 'bridget-typescript/Topic';
import { Image } from 'bridget-typescript/Image';
import { IMaybeEpic as MaybeEpic } from 'bridget-typescript/MaybeEpic';
import { formatDate } from 'date';
import { logger } from "../logger";
import { createElement as h } from 'react';
import setup from 'client/setup';
import Epic from 'components/shared/epic';
import ReactDOM from 'react-dom';

// ----- Run ----- //

interface FontFaceSet {
    readonly ready: Promise<FontFaceSet>;
}

declare global {
    interface Document {
        fonts: FontFaceSet;
    }
}

function getAdSlots(): AdSlot[] {
    const advertSlots = document.getElementsByClassName('ad-slot');

    if (!advertSlots) {
        return [];
    }

    const scrollLeft = document.scrollingElement 
        ? document.scrollingElement.scrollLeft : document.body.scrollLeft;
    const scrollTop = document.scrollingElement 
        ? document.scrollingElement.scrollTop : document.body.scrollTop;

    return Array.from(advertSlots).map(adSlot => {
        const slotPosition = adSlot.getBoundingClientRect();
        return new AdSlot({
            x: slotPosition.left + scrollLeft,
            y: slotPosition.top + scrollTop,
            width: slotPosition.width,
            height: slotPosition.height
        })
    });
}

function insertAds(): void {
    let adSlots = getAdSlots();
    if (adSlots.length > 0) {
        commercialClient.insertAdverts(adSlots);
        const targetNode = document.querySelector('body') as Node;
        const config = { attributes: true, childList: true, subtree: true };
        const callback = function(): void {
            const currentAdSlots = getAdSlots();
            if (JSON.stringify(adSlots) !== JSON.stringify(currentAdSlots)) {
                adSlots = currentAdSlots;
                commercialClient.updateAdverts(currentAdSlots);
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

        try {
            document.fonts.ready.then(() => commercialClient.updateAdverts(getAdSlots()));
        } catch (e) {
            logger.error(`font loading API not supported: ${e}`)
        }
    }
}

function ads(): void {
    userClient.isPremium().then(premiumUser => {
        if (!premiumUser) {
            Array.from(document.querySelectorAll('.ad-placeholder'))
                 .forEach(placeholder => placeholder.classList.remove('hidden'))
            insertAds();
        }
    })
}

function topicClick(e: Event): void {
    const follow = document.querySelector('.js-follow');
    const status = follow?.querySelector('.js-status');
    const statusText = status?.textContent;
    const id = follow?.getAttribute('data-id');

    if (!id) {
        logger.error('No id for topic');
        return;
    }

    const topic = new Topic({ id });

    if (statusText && statusText === 'Follow') {
        notificationsClient.follow(topic).then(response => {
            if (status?.textContent) {
                status.textContent = "Following";
            }
        })
    } else {
        notificationsClient.unfollow(topic).then(response => {
            if (status?.textContent) {
                status.textContent = "Follow";
            }
        })
    }
}

function topics(): void {
    const follow = document.querySelector('.js-follow');
    const status = follow?.querySelector('.js-status');
    const id = follow?.getAttribute('data-id');

    if (!id) {
        logger.error('No id for topic');
        return;
    }

    const topic = new Topic({ id });
    follow?.addEventListener('click', topicClick);
    notificationsClient.isFollowing(topic).then(following => {
        if (following && status?.textContent) {
            status.textContent = "Following";
        }
    })
}

function launchSlideshow(src: string | null): void {
    const images = Array.from(document.querySelectorAll('.js-launch-slideshow'));
    const imagesWithCaptions: Image[] = images.flatMap((image: Element) => {
        const url = image.getAttribute('src');
        const caption =  image.getAttribute('data-caption') ?? undefined;
        const credit = image.getAttribute('data-credit') ?? undefined;
        return url ? new Image({ url, caption, credit }) : [];
    });
    const clickedImageIndex = images.findIndex((image: Element) => image.getAttribute('src') === src);
    if (imagesWithCaptions.length && clickedImageIndex >= 0) {
        galleryClient.launchSlideshow(imagesWithCaptions, clickedImageIndex);
    }
}

function slideshow(): void {
    const images = document.querySelectorAll('.js-launch-slideshow');
    Array.from(images)
        .forEach((image: Element) => image.addEventListener('click', (e: Event) => {
            launchSlideshow(image.getAttribute('src'));
        }));
}

function formatDates(): void {
    Array.from(document.querySelectorAll('time[data-date]'))
        .forEach(time => {
            try {
                const timestamp = time.getAttribute('data-date');
                if (timestamp) {
                    time.textContent = formatDate(new Date(timestamp))
                }
            } catch (e) {
                logger.error(`Unable to parse and format date ${time}`, e);
            }
        })
}

function insertEpic(): void {
    if (navigator.onLine && !document.getElementById('epic-container')) {
        acquisitionsClient.getEpics().then((maybeEpic: MaybeEpic) => {
            if (maybeEpic.epic) {
                const epicContainer = document.createElement('div');
                epicContainer.id = 'epic-container';
                document.querySelector('footer')?.prepend(epicContainer);
                const { title, body, firstButton, secondButton } = maybeEpic.epic;
                const epicProps =  { title, body, firstButton, secondButton };
                ReactDOM.render(h(Epic, epicProps), epicContainer)
            }
        })
    }
}

setup();
ads();
topics();
slideshow();
formatDates();
insertEpic();