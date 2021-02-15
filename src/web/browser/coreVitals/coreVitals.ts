import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';


// Stops ts assuming json values are null
const temp : any = null;

const jsonData = {
	'page_view_id': '',
	'received_timestamp': `${new Date().toISOString()}`,
	'id': 'prod',
	'received_date': new Date().toISOString().slice(0, 10),
    'fid': temp,
    'cls': temp,
    'lcp': temp,
    'fcp': temp,
    'ttfb': temp,
}

export const coreVitals = (): void =>
{
    type CoreVitalsArgs = {
        name: string;
        value: number;
    };

	const getValue = ({ name, value }: CoreVitalsArgs): void => {

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

	// If CLS has been calculated
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
    };
}

	// Set page view and browser ID
	if(window.guardian && window.guardian.ophan)
    {
		jsonData.page_view_id = window.guardian.ophan.pageViewId;
		jsonData.id = window.guardian.config.ophan.browserId;
	}


	getCLS(getValue, false);
	getFID(getValue);
    getLCP(getValue);
    getFCP(getValue);
    getTTFB(getValue);


};
