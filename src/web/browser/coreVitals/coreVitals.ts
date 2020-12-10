import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';


const jsonData = {
    'page_view_id': '',
    'fid': 0,
    'cls': 0,
    'lcp': 0,
    'fcp': 0,
    'ttfb': 0,
}

export const coreVitals = (): void =>
{
    type coreVitalsArgs = {
        name: string;
        value: number;
    };


const getValue = ({ name, value }: coreVitalsArgs): void => {
    switch(name){
        case('FCP'):
            console.log(`FCP: ${  value}`);
            jsonData.fcp = value;
            break;
        case('CLS'):
            console.log(`CLS: ${value}`)
            jsonData.cls = value;
            break;
        case('LCP'):
            console.log(`LCP: ${value}`)
            jsonData.lcp = value;
            break;
        case('FID'):
            console.log(`FID: ${value}`)
            jsonData.fid = value;
            break;
        case('TTFB'):
            console.log(`TTFB: ${value}`)
            jsonData.ttfb = value;
            break;
    }
    console.log(jsonData);
}


    document.addEventListener("DOMContentLoaded", function() {

        if(window.guardian && window.guardian.ophan)
        {
            jsonData.page_view_id = window.guardian.ophan.pageViewId;
        }
        getFID(getValue);
        getLCP(getValue);
        getFCP(getValue);
        getTTFB(getValue);
        getCLS(getValue);
    });

    window.addEventListener('unload', function(event) {
        getCLS(console.log);
    });

};






