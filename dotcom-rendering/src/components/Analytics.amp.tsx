export interface AnalyticsModel {
	gaTracker: string;
	title: string;
	comscoreID: string;
	section?: string;
	contentType: string;
	id: string;
	neilsenAPIID: string;
	domain: string;
	ipsosSectionName: string;
}

type Props = {
	analytics: AnalyticsModel;
};

export const Analytics = ({
	analytics: {
		gaTracker,
		comscoreID,
		title,
		section = '',
		contentType,
		id,
		neilsenAPIID,
		domain,
		ipsosSectionName,
	},
}: Props) => {
	const scripts: string[] = [
		`<amp-analytics config="https://ophan.theguardian.com/amp.json" data-credentials="include" ></amp-analytics>`,
		`<amp-analytics config="https://ophan.theguardian.com/amp.json" data-block-on-consent="_till_responded" data-credentials="include">
			<script type="application/json">
				{
					"requests": {
						"pageViewWithConsentTest": "http://localhost:8001/receive?componentEvent=\${componentEvent}",
						"pageViewWithConsent": "\${additionalBase}&componentEvent=\${componentEvent}"
					},
					"triggers": {
						"trackPageviewTcf": {
							"on": "visible",
							"request": "pageViewWithConsentTest",
							"selector": ".amp-geo-group-tcfv2",
							"vars": {
								"componentEvent": "%7B%22consentJurisdiction%22:%22TCF%22,%22consentUUID%22:%22\${clientId(consentUUID)}%22,%22consent%22:%22\${consentString}%22%7D"
							}
						},
						"trackPageviewCcpa": {
							"on": "visible",
							"request": "pageViewWithConsentTest",
							"selector": ".amp-geo-group-ccpa",
							"vars": {
								"componentEvent": "%7B%22consentJurisdiction%22:%22CCPA%22,%22consentUUID%22:%22\${clientId(ccpaUUID)}%22,%22consent%22:%22\$EQUALS(\${consentState}, insufficient)%22%7D"
							}
						},
						"trackPageviewAus": {
							"on": "visible",
							"request": "pageViewWithConsentTest",
							"selector": ".amp-geo-group-aus",
							"vars": {
								"componentEvent": "%7B%22consentJurisdiction%22:%22AUS%22,%22consentUUID%22:%22\${clientId(ccpaUUID)}%22,%22consent%22:%22\$EQUALS(\${consentState}, sufficient)%22%7D"
							}
						}
					},
					"transport": {
						"beacon": false,
						"xhrpost": false,
						"useBody": false,
						"image": true
					}
				}
			</script>
		</amp-analytics>`,
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
