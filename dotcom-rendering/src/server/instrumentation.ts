import { diag, DiagLogLevel } from '@opentelemetry/api';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
// The OTel packages are pinned to 0.219: 0.220+ breaks webpack production builds until the fix
// in webpack/webpack#21623 ships. See open-telemetry/opentelemetry-js#6981.
import { NodeSDK } from '@opentelemetry/sdk-node';
import { logger } from './lib/logging';

// Route OTel's internal diagnostics through DCR's logger so that export failures appear in CloudWatch rather than
// being silently ignored.
//
// This is important because the OTLP exporter will silently fail if it can't reach the endpoint, which can happen if
// the (nonessential) endpoint is down.
diag.setLogger(
	{
		error: (message, ...args) => logger.error(message, ...args),
		warn: (message, ...args) => logger.warn(message, ...args),
		info: (message, ...args) => logger.info(message, ...args),
		debug: (message, ...args) => logger.debug(message, ...args),
		verbose: (message, ...args) => logger.debug(message, ...args),
	},
	DiagLogLevel.WARN, // WARN and above only — ERROR covers export failures
);

// This code is mostly boilerplate taken from the Node SDK README
//
// Note: we can't use auto instrumentation as it doesn't work natively with webpack,
// so we call the only module that works which is HttpInstrumentation
//
// @see https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
// @see https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-sdk-node/README.md
const sdk = new NodeSDK({
	traceExporter: new OTLPTraceExporter(),
	instrumentations: [
		new HttpInstrumentation({
			// The load balancer polls this every few seconds
			ignoreIncomingRequestHook: (request) =>
				request.url === '/_healthcheck',
			// Rendering makes no outbound calls, so all we'd trace is AWS SDK background chatter
			ignoreOutgoingRequestHook: () => true,
		}),
	],
});

sdk.start();

process.on('SIGTERM', () => {
	sdk.shutdown()
		.then(
			() => logger.info('SDK shut down successfully'),
			(err) => logger.error('Error shutting down SDK', err),
		)
		.finally(() => process.exit(0));
});
