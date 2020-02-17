import * as Webview from 'mobile-apps-thrift-typescript/Webview';
import { Epic } from 'mobile-apps-thrift-typescript/Epic';
import { injectEpicCreative, addEventListenerScroll, epicHtml } from './epic';

export class WebviewHandler implements Webview.IHandler {
    updateFontSize(size: number): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    webviewThriftPackage(): number {
        return 0;
    }

    insertEpic(epic: Epic): void {
        if (navigator.onLine && !document.getElementById('creative-container')) {
            const { title, body, firstButton, secondButton } = epic;
            const creativeContainer = document.createElement('div');
            creativeContainer.id = 'creative-container';
            creativeContainer.innerHTML = epicHtml(title, body, firstButton, secondButton);
            injectEpicCreative(creativeContainer);
            addEventListenerScroll(creativeContainer);
        }
    }
}