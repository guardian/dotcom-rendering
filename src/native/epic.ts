import { nativeClient } from "./nativeApi";

let impressionSeen = false;

function isElementPartiallyInViewport(el: Element) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}

function debounce(func: () => void, wait: number) {
    let args: any;
    let context: any;
    let timeout: any;
    let later;

    return function() {
        context = this;
        args = arguments;

        later = () => {
            timeout = null;
            func.apply(context, args);
        }

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (!timeout) {
            func.apply(context, args);
        }
    };
}

function isCreativeInView(creativeContainer: any) {
    if (!impressionSeen && isElementPartiallyInViewport(creativeContainer)) {
        // call into native layer
        impressionSeen = true;
    }
}

function addEventListenerScroll(creativeContainer: HTMLDivElement) {
    window.addEventListener('scroll', debounce(isCreativeInView.bind(null, creativeContainer), 100));
}

function injectEpicCreative(creativeContainer: Node) {
    const body = document.querySelector('body');
    body?.append(creativeContainer);
}

function epicHtml(title: string, body: string, premiumButton: string, contribute: string | undefined) {
    const contributeButton = contribute ? `
        <div>
            <a class="epic-button" href="#" onClick=${() => nativeClient.launchFrictionScreen()}>
                ${contribute}
                <svg class="epic-button-arrow" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="5 5 20 20">
                    <path fill="#121212" d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9"/>
                </svg>
            </a>
        </div>` : null;

    return `
        <h1>${title}</h1>
        <div>${body}</div>
        <div class="button-container">
            <div>
                <a class="epic-button" href="#" onClick=${() => nativeClient.launchFrictionScreen()}>
                    ${premiumButton}
                    <svg class="epic-button-arrow" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="5 5 20 20">
                        <path fill="#121212" d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9"/>
                    </svg>
                </a>
            </div>
            ${contributeButton}
        </div>
    `;
}

export {
    addEventListenerScroll,
    injectEpicCreative,
    epicHtml
}