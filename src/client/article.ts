// ----- Imports ----- //

import setup from 'client/setup';
import { nativeClient } from 'native/nativeApi';
import { AdSlot } from 'mobile-apps-thrift-typescript/AdSlot'
import { Topic } from 'mobile-apps-thrift-typescript/Topic';
import { Image } from 'mobile-apps-thrift-typescript/Image';
import { WebviewServer } from 'native/thrift/webviewServer';
import * as Webview from 'mobile-apps-thrift-typescript/Webview';
import { WebviewHandler } from 'native/webviewApi';
import { Message } from 'native/thrift/message';
import { formatDate } from 'date';
import { epicHtml, injectEpicCreative, addEventListenerScroll } from 'native/epic';

// ----- Run ----- //

function getAdSlots(): AdSlot[] {
    const advertSlots = document.getElementsByClassName('ad-slot');
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
        
    nativeClient.insertAdverts(adSlots)
    const targetNode = document.querySelector('body') as Node;
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function(): void {
        const currentAdSlots = getAdSlots();
        if (JSON.stringify(adSlots) !== JSON.stringify(currentAdSlots)) {
            // TODO: add this to mobile-apps-thrift and implement client side
            // nativeClient.updateAdverts(currentAdSlots);
            adSlots = currentAdSlots;
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

function ads(): void {
    insertAds();
    nativeClient.isPremiumUser().then(premiumUser => {
        if (!premiumUser) {
            Array.from(document.querySelectorAll('.ad-placeholder'))
                 .map(placeholder => placeholder.classList.remove('hidden'))
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
        console.error('No id for topic');
        return;
    }

    const topic = new Topic({ id });

    if (statusText && statusText === 'Follow') {
        nativeClient.follow(topic).then(response => {
            if (status?.textContent) {
                status.textContent = "Following";
            }
        })
    } else {
        nativeClient.unfollow(topic).then(response => {
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
        console.error('No id for topic');
        return;
    }

    const topic = new Topic({ id });
    follow?.addEventListener('click', topicClick);
    nativeClient.isFollowing(topic).then(following => {
        if (following && status?.textContent) {
            status.textContent = "Following";
        }
    })
}

function launchSlideshow(src: string | null): void {
    const images = Array.from(document.querySelectorAll('.js-launch-slideshow'));
    const imagesWithCaptions: Image[] = images.flatMap((image: Element) => {
        const url = image.getAttribute('src');
        const caption =  image.getAttribute('caption') ?? undefined;
        const credit = image.getAttribute('credit') ?? undefined;
        return url ? new Image({ url, caption, credit }) : [];
    });
    const clickedImageIndex = images.findIndex((image: Element) => image.getAttribute('src') === src);
    if (imagesWithCaptions.length && clickedImageIndex >= 0) {
        nativeClient.launchSlideshow(imagesWithCaptions, clickedImageIndex);
    }
}

function slideshow(): void {
    const images = document.querySelectorAll('.js-launch-slideshow');
    Array.from(images)
        .forEach((image: Element) => image.addEventListener('click', (e: Event) => {
            launchSlideshow(image.getAttribute('src'));
        }));
}

const webviewServer = new WebviewServer(new Webview.Processor(new WebviewHandler));
window.receiveNativeRequest = (message: Message): void => webviewServer.receive(message);

function formatDates(): void {
    Array.from(document.querySelectorAll('time[data-date]'))
        .forEach(time => {
            try {
                const timestamp = time.getAttribute('data-date');
                if (timestamp) {
                    time.textContent = formatDate(new Date(timestamp))
                }
            } catch (e) {
                console.error(e);
            }
        })
}

setup();
ads();
topics();
slideshow();
formatDates();


if (navigator.onLine && !document.getElementById('creative-container')) {
    const epic = {
        title: "title",
        body: "body",
        firstButton: "",
        secondButton: ""
    }
    const { title, body, firstButton, secondButton } = epic;
    const creativeContainer = document.createElement('div');
    creativeContainer.id = 'creative-container';
    creativeContainer.innerHTML = epicHtml(title, body, firstButton, secondButton);
    injectEpicCreative(creativeContainer);
    addEventListenerScroll(creativeContainer);
}