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

setup();
let adSlots = getAdSlots();

// TODO: this can be removed after adding a min-height to images
setTimeout(() => {
    adSlots = getAdSlots();
    nativeClient.insertAdverts(adSlots)
}, 2000)

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