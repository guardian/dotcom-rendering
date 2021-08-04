# Logging

We use log4js to handle application logs, which can be found in the logs/ directory when running locally
or in /var/log/dotcom-rendering/ in production. At the moment these logs do not contain uncaught exceptions - these
are logged by the frontend article app at present when dotcom-rendering fails to render a page.

Logs are shipped from the appplication instance to the central elk stack, you can find them [here](<https://logs.gutools.co.uk/app/kibana#/discover?_g=()&_a=(columns:!(_source),index:a35a6090-59d7-11e8-bbe4-cbb5b151b19c,interval:auto,query:(language:lucene,query:'app:dotcom-rendering'),sort:!('@timestamp',desc))>).

To log something:

    import { logger } from './logging';

    logger.info('Logging can be useful');
    logger.warn('But also expensive');
    logger.error('Help someone put me in a wood burner');
