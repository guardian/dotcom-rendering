import path from 'node:path';
import { isObject } from '@guardian/libs';
import type { Configuration, Layout, LoggingEvent } from 'log4js';
import { addLayout, configure, getLogger, shutdown } from 'log4js';
import { type DCRLoggingStore, loggingStore } from './logging-store';

const logName = `dotcom-rendering.log`;

const logLocation =
	process.env.NODE_ENV === 'production' &&
	!process.env.DISABLE_LOGGING_AND_METRICS
		? `/var/log/dotcom-rendering/${logName}`
		: `${path.resolve('logs')}/${logName}`;

type LogFields = Partial<DCRLoggingStore> &
	Record<string | number | symbol, unknown>;

const logFields = (logEvent: LoggingEvent): LogFields => {
	const { request, requestId, abTests } = loggingStore.getStore() ?? {
		request: { pageId: 'outside-request-context' },
	};

	const coreFields = {
		stack: process.env.GU_STACK ?? 'frontend',
		app: process.env.GU_APP ?? 'rendering',
		stage:
			typeof process.env.GU_STAGE === 'string'
				? process.env.GU_STAGE.toUpperCase()
				: 'DEV',
		'@timestamp': logEvent.startTime,
		level: logEvent.level.levelStr,
		request,
		requestId,
		abTests,
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

const consoleLayout: Layout = {
	type: 'pattern',
	pattern: '%d{hh:mm:ss.SSS} %[[%p]%] - %x{message}',
	tokens: {
		message: (logEvent: LoggingEvent) => {
			const fields = logFields(logEvent);

			if (fields.request !== undefined && isObject(fields.response)) {
				const status =
					typeof fields.response.status === 'number'
						? fields.response.status
						: '[status missing]';
				const requestPath = fields.request.path ?? '[path missing]';

				return `${status} response for ${requestPath}`;
			} else {
				return logEvent.data;
			}
		},
	},
};

addLayout('json', () => {
	return (logEvent) => {
		return JSON.stringify(logFields(logEvent));
	};
});

const disableLog4js: Configuration = {
	appenders: {
		console: { type: 'console' },
	},
	categories: {
		default: { appenders: ['console'], level: 'off' },
		off: { appenders: ['console'], level: 'off' },
	},
};

const enableLog4js: Configuration = {
	appenders: {
		console: {
			type: 'console',
			layout: consoleLayout,
		},
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
		out: {
			type: 'stdout',
			layout: { type: 'json', separator: ',' },
		},
	},
	categories: {
		default: { appenders: ['out', 'fileAppender'], level: 'info' },
		production: { appenders: ['out', 'fileAppender'], level: 'info' },
		code: { appenders: ['out', 'fileAppender'], level: 'debug' },
		development: { appenders: ['console'], level: 'debug' },
	},
	// log4js cluster mode handling does not work as it prevents
	// logs from processes other than the main process from
	// writing to the log.
	disableClustering: true,
};

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

if (process.env.DISABLE_LOGGING_AND_METRICS === 'true') {
	configure(disableLog4js);
} else {
	configure(enableLog4js);
}

const getLoggerCategory = (): string => {
	if (process.env.DISABLE_LOGGING_AND_METRICS === 'true') {
		return 'off';
	}
	if (process.env.NODE_ENV === 'development') {
		return 'development';
	}
	if (process.env.NODE_ENV === 'production') {
		return process.env.GU_STAGE === 'CODE' ? 'code' : 'production';
	}
	return 'default';
};

export const logger = getLogger(getLoggerCategory());
