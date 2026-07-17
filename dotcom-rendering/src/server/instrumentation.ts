import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';

const OTEL_EXPORTER_ENDPOINT =
	process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318';

const sdk = new NodeSDK({
	traceExporter: new OTLPTraceExporter({
		url: `${OTEL_EXPORTER_ENDPOINT}/v1/traces`,
	}),
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

console.log('OpenTelemetry tracing initialised (auto-instrumentation)');

process.on('SIGTERM', () => {
	void sdk.shutdown().then(() => {
		console.log('OpenTelemetry tracing shut down');
	});
});
