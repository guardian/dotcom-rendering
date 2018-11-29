import { GAPProxy } from '../gap-core/gap-core';

const customProxy: GAPProxy = {
    transform: (resp: Response): Response => {
        // do custom transforms here, perhaps using resp.url
        return resp;
    },
};

if (window.GAP) {
    window.GAP.registerProxy(customProxy);
}
