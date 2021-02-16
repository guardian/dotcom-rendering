import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

// This sends data to the test table

type CoreWebVitalsPayload = {
	page_view_id: string;
	received_timestamp: string;
	id: string;
	received_date: string;
	fid: null | number;
	cls: null | number;
	lcp: null | number;
	fcp: null | number;
	ttfb: null | number;
};

const jsonData: CoreWebVitalsPayload = {
	id: '',
	page_view_id: '',
	received_timestamp: new Date().toISOString(),
	received_date: new Date().toISOString().slice(0, 10),
	fid: null,
	cls: null,
	lcp: null,
	fcp: null,
	ttfb: null,
};

export const coreVitals = (): void => {
	type CoreVitalsArgs = {
		name: string;
		value: number;
	};

	const addToJson = ({ name, value }: CoreVitalsArgs): void => {
		switch (name) {
			case 'FCP':
				jsonData.fcp = Math.round(value * 1000000) / 1000000;
				break;
			case 'CLS':
				jsonData.cls = Math.round(value * 1000000) / 1000000;
				break;
			case 'LCP':
				jsonData.lcp = Math.round(value * 1000000) / 1000000;
				break;
			case 'FID':
				jsonData.fid = Math.round(value * 1000000) / 1000000;
				break;
			case 'TTFB':
				jsonData.ttfb = Math.round(value * 1000000) / 1000000;
				break;
		}

		// If CLS has been calculated
		if (jsonData.cls !== null) {
			fetch(
				'https://performance-events.guardianapis.com/core-web-vitals',
				{
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					headers: {
						'Content-Type': 'application/json',
					},
					redirect: 'follow',
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-w
					body: JSON.stringify(jsonData),
				},
			);
		}
	};

	// Set page view and browser ID
	if (window.guardian && window.guardian.ophan) {
		jsonData.page_view_id = window.guardian.ophan.pageViewId;
		jsonData.id = window.guardian.config.ophan.browserId;
	}

	getCLS(addToJson, false);
	getFID(addToJson);
	getLCP(addToJson);
	getFCP(addToJson);
	getTTFB(addToJson);
};
