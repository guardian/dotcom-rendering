import { AdSlot } from "@guardian/bridget/AdSlot";
import { Image } from "@guardian/bridget/Image";
import { commercialClient, galleryClient, userClient } from "../native/nativeApi";
import { logger } from "../logger";

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

function launchSlideshow(src: string | null): void {
    const images = Array.from(document.querySelectorAll('.js-launch-slideshow'));
    const title = document.title;
    const imagesWithCaptions: Image[] = images.flatMap((image: Element) => {
        const url = image.getAttribute('src');
        const caption =  image.getAttribute('data-caption') ?? undefined;
        const credit = image.getAttribute('data-credit') ?? undefined;
        return url ? new Image({ url, caption, credit }) : [];
    });
    const clickedImageIndex = images.findIndex((image: Element) => image.getAttribute('src') === src);
    if (imagesWithCaptions.length && clickedImageIndex >= 0) {
        galleryClient.launchSlideshow(imagesWithCaptions, clickedImageIndex, title);
    }
}

function slideshow(): void {
    const images = document.querySelectorAll('.js-launch-slideshow');
    Array.from(images)
        .forEach((image: Element) => image.addEventListener('click', (e: Event) => {
            launchSlideshow(image.getAttribute('src'));
        }));
}

export {
    ads,
    slideshow,
};
