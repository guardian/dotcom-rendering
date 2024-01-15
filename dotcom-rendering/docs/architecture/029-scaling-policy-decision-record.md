# Scaling

## Context

During a health sprint in January 2024 we have run a series of load tests against DCR aimed at understanding:

-   The ideal latency for each request
-   The optimal instance size and number of instances required to uphold that SLA
-   Whether using cluster mode (i.e. spinning up multiple instances of the DCR app) can improve performance
-   Whether we can reduce our AWS costs

## Load test results

-   The ideal latency for each request is around 140ms.
-   With the current level of traffic (200 req/sec) this latency can be achieved with:

| Instance Type | Cluster Mode Enabled | Instance Count | Avg Latency | Cost per ASG per hour (reserved) |
| ------------- | -------------------- | -------------- | ----------- | -------------------------------- |
| t4g.small     | no                   | 21             | 143ms       | £0.2436                          |
| t4g.xlarge    | yes                  | 6              | 143ms       | £0.5574                          |

-   Cluster mode performs best when spinning up CPU-1 instances of the node app
-   Enabling cluster mode drastically improves the performance of machines that have more than 2 CPUs available

More detailed load test results can be seen here (testing article rendering only):
https://docs.google.com/spreadsheets/d/135iqkVeIo-ou6SWnDl83n35wbu7TCuaW9y2qy87t8c4/edit#gid=0

## Decision

-   Based on cost, we have decided to keep the t4g.small setup.
-   We will [gradually reduce](https://github.com/guardian/dotcom-rendering/pull/10082) our instance count from 27 to 21.

## Future Enhancements

Currently there is work in progress to break up the DCR app into multiple stacks:

-   Article Rendering
-   Fronts Rendering
-   Interactives Rendering
-   Applications Rendering

Once this is complete, we can revisit our scaling decisions and allow for scaling each stack separately as they may have different requirements / traffic levels etc.
