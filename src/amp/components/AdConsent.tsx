import React from 'react';
import { JsonScript } from './JsonScript';

const sourcepointDomain = 'sourcepoint.theguardian.com';

const pubData = {
	authId: 'CLIENT_ID',
	client_id: 'CLIENT_ID',
	// Matches ampViewId from https://ophan.theguardian.com/amp.json
	page_view_id: 'PAGE_VIEW_ID',
	page_view_id_64: 'PAGE_VIEW_ID_64',
	platform: 'amp',
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

export const AdConsent: React.FC = ({}) => {
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

							// frameworks
							tcfv2: ['preset-eea', 'ca', 'nz', 'unknown'],
							ccpa: ['us'],
							aus: ['au'],
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
						checkConsentHref: `https://${sourcepointDomain}/wrapper/tcfv2/v1/amp-v2`,
						promptUISrc: `https://${sourcepointDomain}/amp/index.html?${queryParams}`,
						clientConfig,
						geoOverride: {
							tcfv2: {
								clientConfig: clientConfigTcfv2,
							},
							ccpa: {
								checkConsentHref: `https://${sourcepointDomain}/ccpa/consent/amp`,
								clientConfig: clientConfigCcpa,
							},
							aus: {
								checkConsentHref: `https://${sourcepointDomain}/ccpa/consent/amp`,
								clientConfig: clientConfigAus,
							},
						},
					}}
				/>
			</amp-consent>
		</>
	);
};
