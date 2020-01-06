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


function poller(interval: number, adSlotPositions: AdSlot[]): void {
    const newAdSlotPositions = getAdSlots();
    if (JSON.stringify(adSlotPositions) !== JSON.stringify(newAdSlotPositions)) {
        // TODO: function to be added to Thrift
        // nativeClient.updateAdverts(newAdSlotPositions);
    }
    setTimeout(poller.bind(null, interval + 50, newAdSlotPositions), interval);
}

setTimeout(() => {
    const adSlotPositions = getAdSlots();
    nativeClient.insertAdverts(adSlotPositions)
    poller(50, adSlotPositions);
}, 2000)
