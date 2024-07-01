export interface AnalyticsModel {
	comscoreID: string;
	section?: string;
	neilsenAPIID: string;
	ipsosSectionName: string;
}

type Props = {
	analytics: AnalyticsModel;
};

export const Analytics = ({
	analytics: { comscoreID, section = '', neilsenAPIID, ipsosSectionName },
}: Props) => {
	const scripts: string[] = [
		`<amp-analytics config="https://ophan.theguardian.com/amp.json" data-credentials="include">
			<script type="application/json">
				{
					"requests": {
						"pageViewWithConsent": "\${additionalBase}&consentJurisdiction=\${consentJurisdiction}&consentUUID=\${consentUUID}&consent=\${consent}"
					},
					"triggers": {
						"trackPageviewTcf": {
							"on": "visible",
							"request": "pageViewWithConsent",
							"selector": ".amp-geo-group-eea",
							"vars": {
								"consentUUID": "\${clientId(consentUUID)}",
								"consent": "\${consentString}",
								"consentJurisdiction": "TCF"
							},
							"visibilitySpec": {
								"totalTimeMin": 1000
							}
						},
						"trackPageviewCcpa": {
							"on": "visible",
							"request": "pageViewWithConsent",
							"selector": ".amp-geo-group-ccpa",
							"vars": {
								"consentUUID": "\${clientId(ccpaUUID)}",
								"consent": "$EQUALS(\${consentState}, sufficient)",
								"consentJurisdiction": "CCPA"

							},
							"visibilitySpec": {
								"totalTimeMin": 1000
							}
						},
						"trackPageviewAus": {
							"on": "visible",
							"request": "pageViewWithConsent",
							"selector": ".amp-geo-group-aus",
							"vars": {
								"consentUUID": "\${clientId(ccpaUUID)}",
								"consent": "$EQUALS(\${consentState}, sufficient)",
								"consentJurisdiction": "AUS"
							},
							"visibilitySpec": {
								"totalTimeMin": 1000
							}
						}
					}
				}
			</script>
		</amp-analytics>`,
		`<amp-analytics data-block-on-consent="_till_responded" id="comscore" type="comscore">
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
		`<amp-analytics data-block-on-consent="_till_accepted" config="https://uk-script.dotmetrics.net/AmpConfig.json?dom=www.theguardian.com&tag=${ipsosSectionName}">
            <script type="application/json">
                {
                    "enabled": "$EQUALS(\${ampGeo(ISOCountry)}, gb)"
                }
            </script>
        </amp-analytics>`,
	];

	return <div dangerouslySetInnerHTML={{ __html: scripts.join('\n') }} />;
};
