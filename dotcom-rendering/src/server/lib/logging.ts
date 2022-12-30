import path from 'path';
import type { LoggingEvent } from 'log4js';
import { addLayout, configure, getLogger, shutdown } from 'log4js';

const logLocation =
	process.env.NODE_ENV === 'production' &&
	!process.env.DISABLE_LOGGING_AND_METRICS
		? '/var/log/dotcom-rendering/dotcom-rendering.log'
		: `${path.resolve('logs')}/dotcom-rendering.log`;

const stage =
	typeof process.env.GU_STAGE === 'string'
		? process.env.GU_STAGE.toUpperCase()
		: 'DEV';

const logFields = (logEvent: LoggingEvent): unknown => {
	const coreFields = {
		stack: 'frontend',
		app: 'dotcom-rendering',
		stage,
		'@timestamp': logEvent.startTime,
		'@version': 1,
		level: logEvent.level.levelStr,
		level_value: logEvent.level.level,
	};
	// log4js uses any[] to type data but we want to coerce it here
	// because we now depend on the type to log the result properly
	const data = logEvent.data[0] as unknown as Record<string, unknown> | string;

	if (typeof data === 'string') {
		return {
			...coreFields,
			message: data,
		};
	}
	return {
		message: 'DCR Render event',
		...coreFields,
		...data,
	};
};

addLayout('json', () => {
	return (logEvent) => {
		return JSON.stringify(logFields(logEvent));
	};
});

const disableLog4js = {
	appenders: {
		console: { type: 'console' },
	},
	categories: {
		default: { appenders: ['console'], level: 'off' },
		off: { appenders: ['console'], level: 'off' },
	},
};

const enableLog4j = {
	appenders: {
		console: { type: 'console' },
		fileAppender: {
			type: 'file',
			filename: logLocation,
			maxLogSize: 10000,
			backups: 5,
			compress: true,
			layout: { type: 'json', separator: ',' },
			// Owner Read & Write, Group Read
			mode: 0o640,
		},
	},
	categories: {
		default: { appenders: ['fileAppender'], level: 'info' },
		production: { appenders: ['fileAppender'], level: 'info' },
		development: { appenders: ['console'], level: 'info' },
	},
	pm2: true,
};

if (process.env.DISABLE_LOGGING_AND_METRICS === 'true') {
	configure(disableLog4js);
} else {
	configure(enableLog4j);
}

// We do this to ensure no memory leaks during development as hot reloading
// doesn't clear up old listeners.
if (process.env.NODE_ENV === 'development') {
	shutdown((e) => {
		if (e) {
			console.log(e);
		}
	});
}

export const logger =
	process.env.DISABLE_LOGGING_AND_METRICS === 'true'
		? getLogger('off')
		: getLogger(process.env.NODE_ENV);
