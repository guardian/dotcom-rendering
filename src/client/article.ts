// ----- Imports ----- //

import setup from 'client/setup';
import { nativeClient } from 'native/nativeApi';
import { AdSlot } from 'mobile-apps-thrift-typescript/AdSlot'

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
    // nativeClient.isPremium().then(premiumUser => {
    //     if (!premiumUser) {
    //         // show placeholders (should be hidden by default)
    //         insertAds();
    //     }
    // })
}

function topicClick(): void {
    // const follow = document.querySelector('.follow');
    // const status = follow?.querySelector('.status');
    // if (status === 'Follow') {
    //     nativeClient.followTopic().then(response => {
    //         status?.textContent = "Following";
    //     })
    // } else {
    //     nativeClient.unfollowTopic().then(response => {
    //         status?.textContent = "Follow";
    //     })
    // }
}

function topics(): void {
    // const follow = document.querySelector('.follow');
    // const status = follow?.querySelector('.status');
    // follow?.addEventListener('click', topicClick);
    // nativeClient.isFollowing().then(following => {
    //     if (following) {
    //         status?.textContent = "Following";
    //     }
    // })
}

function launchSlideshow(e: any): void {
    // const images = Array.from(document.querySelectorAll('.launch-slideshow'));
    // const imagesWithCaptions = images.map(image => {
    //     new Image({
    //         url: image.src,
    //         caption: image.alt,
    //         credit: image.alt
    //     })
    // })
    // const clickedImageIndex = images.findIndex(image => image.src === e.target.src)
    // nativeClient.launchSlideshow(imagesWithCaptions, clickedImageIndex);
}

function slideshow(): void {
    const images = document.querySelectorAll('.launch-slideshow');
    Array.from(images)
        .forEach((image: Node) => image.addEventListener('click', launchSlideshow));
}

setup();
ads();
topics();
slideshow();