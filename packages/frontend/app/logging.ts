import path from 'path';
import { configure, getLogger } from 'log4js';

const logLocation =
    process.env.NODE_ENV === 'production'
        ? '/var/log/dotcom-rendering/dotcom-rendering.log'
        : `${path.resolve('logs')}/dotcom-rendering.log`;

configure({
    appenders: { fileAppender: { type: 'file', filename: logLocation } },
    categories: { default: { appenders: ['fileAppender'], level: 'info' } },
});

export const logger = getLogger();
logger.level = 'info';
