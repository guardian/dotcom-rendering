# urlbox.io subscription

## Metadata

-   Date: 3rd August 2021
-   Author: Nic Long
-   Platform concerned: n/a

## Context

As part of the DCR migration, the Dotcom Team produces visual diffs of DCR and
Frontend to spot inconsistencies. The [Screeny
Tool](https://github.com/guardian/screeny) has been developed to help with this
and uses a 3rd party service - urlbox.io - to capture screenshots.

## Pricing review

The monthly cost at time of writing is $29/month for the basic tier. This
provides 5000 requests/month and we don't anticipate needing more than this.

It is possible to exceed the quota (with associated charges) but urlbox.io
notify by email when an account reaches 80%, 90%, and 100% of its quota.

The contract renews each month and cancellation is easy via their website.

## Data privacy engineering review

There are no known data privacy concerns. urlbox.io will be used to capture
screenshots of publicly accessible pages on www.theguardian.com.

## Security engineering review

urlbox.io is an (HTTP) API service, accessed directly without a specific
client-library. There are no known security concerns.

## Performance engineering review

N/A - the dependent tool - Screeny - is run on developer machines only.
