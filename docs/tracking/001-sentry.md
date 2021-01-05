# Sentry

## Context
Sentry is an external service where we send client side errors to be tracked. The Sentry lib that we insert on the page listens for unhandled as well as handled errors, formats them, adds context information, and then sends them to their servers where we can see what issues people are facing in the wild.

Although the job that Sentry does seems simple it has to handle a lot of edge cases and deal with cross browser issues causing the bundle size to reach around 20Kb.

## Decision
We should not be loading this much code on every page, especially when we so rarely use it, so instead we load a custom `sentryLoader` script that listens for errors and, if they happen, only then loads the full script.

### Lazy loading
Our custom lazy loading script script has the following features:

#### Ad Block detection
Ad blockers will block calls out to Sentry to report errors so - if we know an ad blocker is in use - there's no point trying to make them. This needlessly uses cpu cycles and messes up the console.

#### Queueing
The call to download Sentry is asynchronous so we need a mechanism to capture any errors that occur while this download is happening. While waiting for Sentry to load and initialise, errors are written to an array. Once the load is complete the array is cleared and each error sent to Sentry.

#### Sampling
Previously we used Sentry's own built in [sampleRate configuration](https://docs.sentry.io/platforms/node/performance/sampling/) option. But if we're lazing loading Sentry then it makes no sense to download 20Kb of code that we will only use 1% of the time. So here we move this sampling logic up into the `sentryLoader` script so that we only download Sentry 1% of the time and even then only when an error occurs.

### Why not?
The downside here is we don't capture all the meta data for those errors that happen prior to the Sentry bundle being downloaded
