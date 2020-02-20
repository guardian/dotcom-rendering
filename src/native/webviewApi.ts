import * as Webview from 'mobile-apps-thrift-typescript/Webview';
import { Epic } from 'mobile-apps-thrift-typescript/Epic';
import ReactDOM from 'react-dom';
import { createElement as h } from 'react';
import EpicComponent from 'components/shared/Epic';

export class WebviewHandler implements Webview.IHandler {
    updateFontSize(size: number): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    webviewThriftPackage(): number {
        return 0;
    }

    insertEpic(epic: Epic): void {
        if (navigator.onLine && !document.getElementById('creative-container')) {
            const creativeContainer = document.createElement('div');
            creativeContainer.id = 'creative-container';
            document.querySelector('footer')?.prepend(creativeContainer);
            const { title, body, firstButton, secondButton } = epic;
            const epicProps = { title, body, firstButton, secondButton };
            ReactDOM.render(h(EpicComponent, epicProps), creativeContainer)
        }
    }
}