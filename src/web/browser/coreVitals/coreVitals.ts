import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';
import { getCookie } from '../cookie';


const jsonData = {
	'page_view_id': '',
	'received_timestamp': `${new Date().toISOString()}`,
	'id': 'prod',
	'received_date': '2021-02-03',
    'fid': null,
    'cls': null,
    'lcp': null,
    'fcp': null,
    'ttfb': null,
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
            jsonData.fcp = parseFloat(value.toFixed(6));
            break;
        case('CLS'):
            jsonData.cls = parseFloat(value.toFixed(6));
            break;
        case('LCP'):
            jsonData.lcp = parseFloat(value.toFixed(6));
            break;
        case('FID'):
            jsonData.fid = parseFloat(value.toFixed(6));
            break;
        case('TTFB'):
            jsonData.ttfb = parseFloat(value.toFixed(6));
            break;
    }
    if(jsonData.cls !== null)
    {
        fetch('https://performance-events.guardianapis.com/core-web-vitals', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-w
            body: JSON.stringify(jsonData)
		})
		console.log(JSON.stringify(jsonData));
    };
}

	getCLS(getValue, false);
	getFID(getValue);
    getLCP(getValue);
    getFCP(getValue);
    getTTFB(getValue);


    document.addEventListener("DOMContentLoaded", function() {

        if(window.guardian && window.guardian.ophan)
        {
			jsonData.page_view_id = window.guardian.ophan.pageViewId;
			jsonData.id = window.guardian.config.ophan.browserId;
		}

		// Temporary to look at what happens to CLS over time
        logCLS();
    });

};

const logCLS = () => {
	let cls = 0;
	new PerformanceObserver(entryList => {
		const entries = entryList.getEntries() || [];
		entries.forEach(e => {
			if (!e.hadRecentInput) { // omit entries likely caused by user input
				cls += e.value;
				console.log(`CLS DELTA: ${ e.value}`);
			}
		});
		console.log(`Cumulative Layout Shift: ${cls}`);
	}).observe({ type: "layout-shift", buffered: true })
}
