import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
// The OTel packages are pinned to 0.219: 0.220+ breaks webpack production builds until the fix
// in webpack/webpack#21623 ships. See open-telemetry/opentelemetry-js#6981.
import { NodeSDK } from '@opentelemetry/sdk-node';

// This code is boilerplate.
// - OpenTelemetry recommends using the NodeSDK https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
// - The NodeSDK README has an example instrumentation.ts that matches our use case better https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-sdk-node/README.md
// Note: we can't use auto instrumentation as it doesn't work natively with webpack, so we call the only module that works which is HttpInstrumentation
const sdk = new NodeSDK({
	traceExporter: new OTLPTraceExporter(),
	instrumentations: [new HttpInstrumentation()],
});

sdk.start();

process.on('SIGTERM', () => {
	sdk.shutdown()
		.then(
			() => console.log('SDK shut down successfully'),
			(err) => console.log('Error shutting down SDK', err),
		)
		.finally(() => process.exit(0));
});
