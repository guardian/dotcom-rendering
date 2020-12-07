import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

export const coreVitals = (): void =>
{
    type coreVitalsArgs = {
        name: string;
        value: number;
    };
let fcp = 0;
let cls = 0;
let lcp = 0;
let fid = 0;
let ttfb = 0;

const getValue = ({ name, value }: coreVitalsArgs): void => {
    console.log(name);
    switch(name){
        case('FCP'):
            console.log(`FCP: ${  value}`);
            fcp = value;
            break;
        case('CLS'):
            cls = value;
            break;
        case('LCP'):
            lcp = value;
            break;
        case('FID'):
            fid = value;
            break;
        case('TTFB'):
            ttfb = value;
            break;
    }
}

    document.addEventListener("DOMContentLoaded", function() {

        getCLS(getValue);
        getFID(getValue);
        getLCP(getValue);
        getFCP(getValue);
        getTTFB(getValue);

        const jsonToSend = {
            'page_view_id': '',
            'cls' : cls,
            'fid' : fid,
            'lcp' : lcp,
            'fcp' : fcp,
            'ttfb' : ttfb,
        }
        console.log(jsonToSend);
    });

};






