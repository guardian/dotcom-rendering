# Google Analytics

## Page view

The following data is tracked in Google Analytics on page view. The data is
extracted from the request body in [`model`](../../frontend/model/index.ts)

| Dimension    | Value                      | Description                                                |
| ------------ | -------------------------- | ---------------------------------------------------------- |
| forceSSL     | true                       |                                                            |
| title        | GA.webTitle                |                                                            |
| anonymizeIp  | true                       |                                                            |
| ~dimension1~ | ~ophan.pageViewId~         | Inactive due to GDPR                                       |
| ~dimension2~ | ~ophan.browserId~          | Inactive due to GDPR                                       |
| dimension3   | 'theguardian.com'          | Platform                                                   |
| dimension4   | GA.section                 |                                                            |
| dimension5   | GA.contentType             |                                                            |
| dimension6   | GA.commissioningDesks      |                                                            |
| dimension7   | GA.contentId               |                                                            |
| dimension8   | GA.authorIds               |                                                            |
| dimension9   | GA.keywordIds              |                                                            |
| dimension10  | GA.toneIds                 |                                                            |
| dimension11  | GA.seriesId                |                                                            |
| dimension15  | identityId                 |                                                            |
| dimension16  | !!identityId               | is user logged in                                          |
| dimension21  | getQueryParam('INTCMP')    | internal campaign code                                     |
| dimension22  | getQueryParam('CMP_BUNIT') | campaign business unit                                     |
| dimension23  | getQueryParam('CMP_TU')    | campaign team                                              |
| dimension26  | GA.isHosted                |                                                            |
| dimension27  | navigator.userAgent        |                                                            |
| dimension29  | window.location.href       |                                                            |
| dimension30  | GA.edition                 |                                                            |
| dimension31  | GA.sponsorLogos            | Not yet implemented                                        |
| dimension42  | GA.brandingType            | Not yet implemented                                        |
| dimension43  | 'dotcom-rendering'         | 'Experience' dimension, for short-lived experiment values. |
| dimension50  | GA.pillar                  |                                                            |
