import path from 'path';
import { configure, getLogger, addLayout } from 'log4js';

const logLocation =
    process.env.NODE_ENV === 'production'
        ? '/var/log/dotcom-rendering/dotcom-rendering.log'
        : `${path.resolve('logs')}/dotcom-rendering.log`;

const logFields = (logEvent: any): any => {
    return {
        stack: 'frontend',
        app: 'dotcom-rendering',
        stage: 'CODE',
        '@timestamp': logEvent.startTime,
        '@version': 1,
        level: logEvent.level.levelStr,
        level_value: logEvent.level.level,
        message: logEvent.data.join(','),
    };
};

addLayout('json', config => {
    return logEvent => {
        return JSON.stringify(logFields(logEvent));
    };
});

configure({
    appenders: {
        console: { type: 'console' },
        fileAppender: {
            type: 'file',
            filename: logLocation,
            maxLogSize: 10000,
            backups: 5,
            compress: true,
            layout: { type: 'json', separator: ',' },
        },
    },
    categories: {
        default: { appenders: ['fileAppender'], level: 'info' },
        development: { appenders: ['console'], level: 'info' },
    },
    pm2: true,
});

export const logger =
    process.env.NODE_ENV === 'development'
        ? getLogger('development')
        : getLogger();
logger.level = 'info';
