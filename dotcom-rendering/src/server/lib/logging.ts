import path from 'node:path';
import type { LoggingEvent } from 'log4js';
import { addLayout, configure, getLogger, shutdown } from 'log4js';
import { loggingStore } from './logging-store';

// write separate log files for each app instance
// required when running multiple processes
// aws-kinesis-agent is configured to look for a file pattern to pick all log files up
const logNamePostfix = process.env.NODE_APP_INSTANCE
	? `-${process.env.NODE_APP_INSTANCE}`
	: '';

const logName = `dotcom-rendering${logNamePostfix}.log`;

const logLocation =
	process.env.NODE_ENV === 'production' &&
	!process.env.DISABLE_LOGGING_AND_METRICS
		? `/var/log/dotcom-rendering/${logName}`
		: `${path.resolve('logs')}/${logName}`;

console.log(`!!! ${logLocation}`);

const logFields = (logEvent: LoggingEvent): unknown => {
	const { request } = loggingStore.getStore() ?? {
		request: { pageId: 'outside-request-context' },
	};

	const coreFields = {
		stack: 'frontend',
		app: 'dotcom-rendering',
		stage:
			typeof process.env.GU_STAGE === 'string'
				? process.env.GU_STAGE.toUpperCase()
				: 'DEV',
		'@timestamp': logEvent.startTime,
		'@version': 1,
		level: logEvent.level.levelStr,
		level_value: logEvent.level.level,
		request,
	};
	// log4js uses any[] to type data but we want to coerce it here
	// because we now depend on the type to log the result properly
	const [arg1, arg2] = logEvent.data;

	const message = typeof arg1 === 'string' ? arg1 : 'DCR Render Event';
	const data = typeof arg2 === 'object' ? arg2 : {};

	return {
		message,
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
			maxLogSize: '5M',
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
	// tell log4js not to cluster logs and write to seperate files
	disableClustering: true,
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
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- Stops undefined from being logged
		if (e) {
			// eslint-disable-next-line no-console  -- Seems okay to log this
			console.log(e);
		}
	});
}

export const logger =
	process.env.DISABLE_LOGGING_AND_METRICS === 'true'
		? getLogger('off')
		: getLogger(process.env.NODE_ENV);
