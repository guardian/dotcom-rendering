import { init as initGa, sendPageView } from './ga';
import { startup } from '@root/src/web/browser/startup';

const init = (): Promise<void> => {
    initGa();
    sendPageView();
    return Promise.resolve();
};

startup('ga', null, init);
