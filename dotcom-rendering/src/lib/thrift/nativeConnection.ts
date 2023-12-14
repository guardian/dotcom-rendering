import type {
	IClientConstructor,
	IProtocolConstructor,
	ITransportConstructor,
	ProtocolType,
	ThriftClient,
	TransportType,
	TTransport,
} from '@creditkarma/thrift-server-core';
import {
	getProtocol,
	getTransport,
	TApplicationException,
	TApplicationExceptionType,
	ThriftConnection,
} from '@creditkarma/thrift-server-core';
import { TMultiplexedProtocol } from './protocols';

declare global {
	interface Window {
		nativeConnections?: Record<string, NativeConnection>;
		android?: {
			postMessage: (data: string, connectionId: string) => void;
		};
		webkit?: {
			messageHandlers: {
				iOSWebViewMessage: {
					postMessage: (nativeMessage: NativeMessage) => void;
				};
			};
		};
	}
}

export interface NativeMessage {
	data: string;
	connectionId: string;
}

interface PromiseResponse {
	resolve: (response: Buffer) => void;
	reject: (error: Error) => void;
	timeoutId: NodeJS.Timeout;
}

const ACTION_TIMEOUT_MS = 30000;

function sendNativeMessage(nativeMessage: NativeMessage): void {
	if (window.android) {
		window.android.postMessage(
			nativeMessage.data,
			nativeMessage.connectionId,
		);
	} else if (window.webkit) {
		window.webkit.messageHandlers.iOSWebViewMessage.postMessage(
			nativeMessage,
		);
	} else {
		console.warn('No native APIs available');
	}
}

export class NativeConnection<Context = void> extends ThriftConnection {
	connectionId = crypto.randomUUID();
	promises: PromiseResponse[] = [];
	outBuffer: NativeMessage[] = [];

	constructor(
		Transport: ITransportConstructor,
		Protocol: IProtocolConstructor,
	) {
		super(Transport, Protocol);
		if (typeof window !== 'undefined') {
			window.nativeConnections = window.nativeConnections ?? {};
			window.nativeConnections[this.connectionId] = this;
		}
	}

	reset(oldConnectionId: string): void {
		if (oldConnectionId === this.connectionId && window.nativeConnections) {
			console.warn('Reseting connection ' + oldConnectionId);
			delete window.nativeConnections[this.connectionId];
			for (const promise of this.promises) {
				promise.reject(
					new TApplicationException(
						TApplicationExceptionType.UNKNOWN,
						'Timeout error',
					),
				);
			}
			this.promises = [];
			this.connectionId = crypto.randomUUID();
			window.nativeConnections[this.connectionId] = this;
		}
	}

	receive(message: NativeMessage): void {
		const resolver = this.promises.shift();
		if (resolver) {
			clearTimeout(resolver.timeoutId);
			const data = Buffer.from(message.data, 'base64');
			resolver.resolve(data);
		}
		this.sendNextMessage();
	}

	private sendNextMessage(): void {
		const message = this.outBuffer.shift();
		if (message) {
			console.log('Sending next message');
			sendNativeMessage(message);
		}
	}

	send(dataToSend: Buffer, context?: void | undefined): Promise<Buffer> {
		const id = this.connectionId;
		// eslint-disable-next-line @typescript-eslint/no-this-alias -- Reassign this
		const connection = this;
		return new Promise<Buffer>(function (res, rej): void {
			connection.promises.push({
				resolve: res,
				reject: rej,
				timeoutId: setTimeout(function () {
					connection.reset(id);
				}, ACTION_TIMEOUT_MS),
			});
			const message: NativeMessage = {
				data: dataToSend.toString('base64'),
				connectionId: id,
			};
			if (connection.promises.length === 1) {
				console.log('Sending message immediately');
				sendNativeMessage(message);
			} else {
				console.log('Queing message because others in flight');
				connection.outBuffer.push(message);
			}
		});
	}
}

export function createAppClient<TClient extends ThriftClient<void>>(
	ServiceClient: IClientConstructor<TClient, void>,
	transport: TransportType = 'buffered',
	protocol: ProtocolType = 'compact',
): TClient {
	class NamedMultiplexedProtocol extends TMultiplexedProtocol {
		constructor(tTransport: TTransport) {
			const Protocol = getProtocol(protocol);
			super(new Protocol(tTransport), ServiceClient.serviceName ?? '');
		}
	}
	const connection = new NativeConnection(
		getTransport(transport),
		NamedMultiplexedProtocol,
	);
	return new ServiceClient(connection);
}
