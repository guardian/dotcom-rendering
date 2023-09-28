import { JsonScript } from './JsonScript.amp';

const sourcepointDomain = 'sourcepoint.theguardian.com';

const pubData = {
	authId: 'CLIENT_ID',
	client_id: 'CLIENT_ID',
	// Matches ampViewId from https://ophan.theguardian.com/amp.json
	page_view_id: 'PAGE_VIEW_ID',
	page_view_id_64: 'PAGE_VIEW_ID_64',
	platform: 'amp',
	source_url: 'SOURCE_URL',
};

const queryParams = new URLSearchParams(pubData).toString();

const clientConfig = {
	accountId: 1257,
	mmsDomain: `https://${sourcepointDomain}`,
	propertyId: 8791,
	pmTab: 'purposes',
	stageCampaign: false,
};

const clientConfigTcfv2 = {
	privacyManagerId: 145885,
	isTCFV2: true,
	propertyHref: 'https://theguardian.amp',
	targetingParams: {
		framework: 'tcfv2',
	},
};

const clientConfigCcpa = {
	privacyManagerId: '5eba7ef78c167c47ca8b433d',
	isCCPA: true,
	siteHref: 'https://theguardian.amp',
	getDnsMsgMms: true,
	alwaysDisplayDns: false,
	showNoticeUntilAction: true,
	targetingParams: {
		framework: 'ccpa',
	},
};

const clientConfigAus = {
	propertyId: 14327,
	privacyManagerId: '5f859e174ed5055e72ce26a6',
	isCCPA: true,
	siteHref: 'https://amp.au.theguardian.com',
	getDnsMsgMms: true,
	alwaysDisplayDns: false,
	showNoticeUntilAction: true,
	targetingParams: {
		framework: 'aus',
	},
};
export const AdConsent = () => {
	// To debug geolocation in dev, make sure you're on the experimental channel of AMP:
	// https://cdn.ampproject.org/experiments.html
	// Then you can load the url with #amp-geo=XX, where XX is the country code
	return (
		<>
			<amp-geo layout="nodisplay">
				<JsonScript
					o={{
						ISOCountryGroups: {
							// Ad regions
							eea: ['preset-eea', 'unknown'],
							us: ['us', 'ca'],
							au: ['au', 'nz'],

							// Frameworks
							tcfv2: ['preset-eea', 'ca', 'nz', 'unknown'],
							ccpa: ['us'],
							aus: ['au'],

							// Europe edition
							// country codes for the council of europe, minus GB
							eur: [
								'al',
								'ad',
								'am',
								'at',
								'az',
								'be',
								'ba',
								'bg',
								'hr',
								'cy',
								'cz',
								'dk',
								'ee',
								'fi',
								'fr',
								'ge',
								'de',
								'gr',
								'hu',
								'is',
								'ie',
								'it',
								'lv',
								'li',
								'lt',
								'lu',
								'mt',
								'md',
								'mc',
								'me',
								'nl',
								'mk',
								'no',
								'pl',
								'pt',
								'ro',
								'sm',
								'rs',
								'sk',
								'si',
								'es',
								'se',
								'ch',
								'tr',
								'ua',
							],
						},
					}}
				/>
			</amp-geo>
			<amp-consent
				layout="nodisplay"
				id="consent"
				style={{ background: 'none' }}
			>
				<JsonScript
					o={{
						consentRequired: 'remote',
						consentInstanceId: 'sourcepoint',
						checkConsentHref: `https://${sourcepointDomain}/wrapper/tcfv2/v1/amp-v2?authId=${pubData.authId}`,
						promptUISrc: `https://${sourcepointDomain}/amp/unified/index.html?${queryParams}`,
						clientConfig,
						geoOverride: {
							tcfv2: {
								clientConfig: clientConfigTcfv2,
							},
							ccpa: {
								checkConsentHref: `https://${sourcepointDomain}/wrapper/ccpa/amp-v2?authId=${pubData.authId}`,
								clientConfig: clientConfigCcpa,
							},
							aus: {
								checkConsentHref: `https://${sourcepointDomain}/wrapper/ccpa/amp-v2?authId=${pubData.authId}`,
								clientConfig: clientConfigAus,
							},
						},
						exposesTcfApi: true,
					}}
				/>
			</amp-consent>
		</>
	);
};
