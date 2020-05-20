import '@root/src/web/browser/prepareCmp';
import { startup } from '@root/src/web/browser/startup';

const init = () => {
    // currently a stub, will fill up soon
    return Promise.resolve();
};

startup('commercial', null, init);
