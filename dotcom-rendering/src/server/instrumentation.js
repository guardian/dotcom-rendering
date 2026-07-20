const {
	OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-http');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');

const provider = new NodeTracerProvider({
	resource: resourceFromAttributes({
		'service.name': process.env.OTEL_SERVICE_NAME || 'dotcom-rendering',
	}),
	spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter())],
});

provider.register();

registerInstrumentations({
	instrumentations: [new HttpInstrumentation()],
});

process.on('SIGTERM', () => {
	provider.shutdown().catch((err) => {
		console.error('OpenTelemetry shutdown failed', err);
	});
});
