# 3rd-Party Technical Review Format

## Context

We are successfully using lightweight architecture decision records to document decisions being made about architecture.
Last year legislation changes around data privacy (GDPR, CCPA, PECR) and their impact on our obligations means we need to increase our technical measures to ensure the safety of our reader's data through:

-   Reducing the number of third-party scripts
-   Architecting our systems with a [privacy by design](https://en.wikipedia.org/wiki/Privacy_by_design) approach
-   Documenting risks and mitigations in place or to be added.
-   Adding new controls to prevent issues, i.e being proactive rather than reactive.

Additional to this privacy concern, we have noticed in the past the difficulty to correctly estimate and measure accurately the performance and by association the revenue impact of each third-party. While they usually come with a direct revenue, there is as well indirect revenue loss through performamce impact:

-   performance degradation impacts our ad display and our advertising revenue
-   performance degradation impacts our contributions conversion rate
-   performance degradation impacts our Google SEO which impact our reach and indirectly all of our revenue streams (contributions, subscriptions, advertising)

To address those 2 concerns, we are making a change to the process for deciding if a third-party will be added. Before a decision is made by the business to add a third-party to our website or apps, we will perform an engineering technical review that will be used to inform the business decision.

The suggested format of the review is the following:

-   Metadata about the review
    -   Date of the review
    -   Author of the review
    -   Platforms concerned
-   Context
-   Data privacy engineering review
-   Security engineering review
-   Perfomance engineering review
-   Recommended mitigations

## Decision

For all third-party technical reviews in this project, a record will be created with a filename of `XXX-technical-review.md` where XXX is the monotonically increasing number described in the linked document.

Please note that as records will be public, specific attention should be paid about information being disclosed.

## Status

Approved
