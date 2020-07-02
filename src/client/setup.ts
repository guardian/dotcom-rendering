// ----- Imports ----- //

import { logger } from 'logger';
import { metrics } from 'client/metrics';
import { metricsClient } from 'native/nativeApi';
import { pipe2 } from 'lib';


// ----- Procedures ----- //

function handleMessage(interactive: HTMLIFrameElement, message: string): void {

    try {
        const { type, value } = JSON.parse(message);

        if (type === 'set-height') {
            interactive.height = value;
        }
    } catch (e) {
        logger.error(e);
    }

}

const updateInteractives = (interactives: Element[]) => ({ data, source }: MessageEvent): void =>
    interactives.forEach(elem => {
        if (elem instanceof HTMLIFrameElement && source === elem.contentWindow) {
            handleMessage(elem, data);
        }
    });

function interactives(): void {

    const interactives = Array.from(document.querySelectorAll('.interactive iframe'));
    window.addEventListener('message', updateInteractives(interactives), false);

}

function twitter(): void {
    const isDarkMode = window?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
    const themeMeta = document.getElementById('twitter-theme');

    if (isDarkMode) {
        themeMeta?.setAttribute('content', 'dark');
    }
}

function performanceMetrics(): void {
    window.addEventListener(
        'load',
        () => {
            pipe2(
                performance.getEntries(),
                metrics,
                metricsClient.sendMetrics.bind(null),
            );
        },
        { once: true },
    );
}

function setup(): void {
    performanceMetrics();
    interactives();
    twitter();
}


// ----- Exports ----- //

export default setup;
