// ----- Imports ----- //

import setup from 'client/setup';
import { nativeClient } from 'native/nativeApi';


// ----- Run ----- //

setup();

const adSlots = getAdSlots();
nativeClient.insertAdverts(adSlots)

interface AdSlot {
    x: number;
    y: number;
    width: number;
    height: number;
}

function getAdSlots(): AdSlot[] {
    const advertSlots = document.getElementsByClassName('ad-placeholder');
    const scrollLeft = document.scrollingElement ? document.scrollingElement.scrollLeft : document.body.scrollLeft;
    const scrollTop = document.scrollingElement ? document.scrollingElement.scrollTop : document.body.scrollTop;

    return Array.from(advertSlots).map(adSlot => {
        const slotPosition = adSlot.getBoundingClientRect();
        return {
            x: slotPosition.left + scrollLeft,
            y: slotPosition.top + scrollTop,
            width: slotPosition.width,
            height: slotPosition.height
        }
    });
}