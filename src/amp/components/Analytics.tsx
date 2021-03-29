import React from 'react';
import { PermutivePayload } from '@root/src/amp/lib/permutive';

export interface AnalyticsModel {
	gaTracker: string;
	title: string;
	fbPixelaccount: string;
	comscoreID: string;
	section?: string;
	contentType: string;
	id: string;
	beacon: string;
	neilsenAPIID: string;
	domain: string;
	permutive: {
		namespace: string;
		apiKey: string;
		payload: PermutivePayload;
	};
	ipsosSectionName: string;
}

export const Analytics: React.FC<{
	analytics: AnalyticsModel;
}> = ({
	analytics: {
		gaTracker,
		fbPixelaccount,
		comscoreID,
		title,
		section,
		contentType,
		id,
		beacon,
		neilsenAPIID,
		domain,
		permutive,
		ipsosSectionName,
	},
}) => {
	const scripts: string[] = [
		`<amp-pixel data-block-on-consent src="${beacon}"></amp-pixel>`,
		`<amp-pixel data-block-on-consent src="//www.facebook.com/tr?id=${fbPixelaccount}&ev=PageView&noscript=1"></amp-pixel>`,
		`<amp-analytics config="https://ophan.theguardian.com/amp.json" data-credentials="include" ></amp-analytics>`,
		`<amp-analytics data-block-on-consent type="googleanalytics" id="google-analytics">
             <script type="application/json">
               {
                 "requests": {
                   "pageviewWithCustomDims": "\${pageview}&cd3=\${platform}&cd4=\${sectionId}&cd5=\${contentType}&cd6=\${commissioningDesks}&cd7=\${contentId}&cd8=\${contributorIds}&cd9=\${keywordIds}&cd10=\${toneIds}&cd11=\${seriesId}&cd26=\${isHostedFlag}&cd29=\${fullRequestUrl}&cd43=\${experience}"
                 },
                 "vars": {
                   "account": "${gaTracker}"
                 },
                 "triggers": {
                   "trackPageview": {
                     "on": "visible",
                     "request": "pageviewWithCustomDims",
                     "vars": {
                       "title": "${title}",
                       "platform": "AMP",
                       "sectionId": "${section}",
                       "contentType": "${contentType}",
                       "contentId": "${id}",
                       "isHostedFlag": "true",
                       "fullRequestUrl": "${domain}/${id}",
                       "experience": "dotcom-rendering"
                     }
                   }
                 }
               }
               </script>
            </amp-analytics>`,
		`<amp-analytics data-block-on-consent id="comscore" type="comscore">
            <script type="application/json">
                {
                    "vars": {"c2": "${comscoreID}"},
                    "extraUrlParams": {"comscorekw": "amp"}
                }
            </script>
        </amp-analytics>`,
		`<amp-analytics type="nielsen">
             <script type="application/json">
                {
                    "vars": {
                        "apid": "${neilsenAPIID}",
                        "apv": "1.0",
                        "apn": "The Guardian",
                        "section": "${section}",
                        "segC": "Guardian - Google AMP"
                    }
                }
            </script>
        </amp-analytics>`,
		`<amp-analytics data-block-on-consent type="permutive">
            <script type="application/json">
                {
                    "vars": {
                        "namespace": "${permutive.namespace}",
                        "key": "${permutive.apiKey}"
                    },
                    "extraUrlParams": ${JSON.stringify(permutive.payload)}
                }
            </script>
        </amp-analytics>`,
		`<amp-analytics data-block-on-consent config="https://uk-script.dotmetrics.net/AmpConfig.json?dom=www.theguardian.com&tag=${ipsosSectionName}">
            <script type="application/json">
                {
                    "enabled": "$EQUALS(\${ampGeo(ISOCountry)}, gb)"
                }
            </script>
        </amp-analytics>`,
	];

	return <div dangerouslySetInnerHTML={{ __html: scripts.join('\n') }} />;
};
