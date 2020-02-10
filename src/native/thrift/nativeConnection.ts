import { 
    ThriftConnection, 
    ThriftClient, 
    IClientConstructor,
    getTransport,
    getProtocol,
    TransportType,
    ProtocolType,
    ITransportConstructor,
    IProtocolConstructor,
    TApplicationException,
    TApplicationExceptionType,
    BufferedTransport,
    CompactProtocol,
    ThriftProcessor
} from '@creditkarma/thrift-server-core'

import * as uuid from 'uuid';
import * as Webview from 'mobile-apps-thrift-typescript/Webview';
import { WebviewHandler } from 'native/webviewApi';

declare global {
    interface Window {
        nativeConnections: { [id: string]: NativeConnection };
        AndroidWebViewRequest?: (nativeMessage: NativeMessage) => {};
        AndroidWebViewResponse?: (nativeMessage: NativeMessage) => {};
        webkit: {
            messageHandlers: {
                iOSWebViewRequest: {
                    postMessage: (nativeMessage: NativeMessage) => {};
                };
                iOSWebViewResponse: {
                    postMessage: (nativeMessage: NativeMessage) => {};
                };
            };
        };
        receiveNativeMessage: (nativeMessage: NativeMessage) => void;
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

export class NativeConnection<Context = void> extends ThriftConnection {
    connectionId = uuid.v4();
    promises: PromiseResponse[] = [];
    outBuffer: NativeMessage[] = [];

    constructor(Transport: ITransportConstructor, Protocol: IProtocolConstructor) {
        super(Transport, Protocol);
        window.nativeConnections = window.nativeConnections || {};
        window.nativeConnections[this.connectionId] = this
    }
    
    reset(oldConnectionId: string): void {
        if (oldConnectionId === this.connectionId) {
            console.warn("Reseting connection " + oldConnectionId)
            delete window.nativeConnections[this.connectionId]
            this.promises.forEach(promise => {
                promise.reject(new TApplicationException(TApplicationExceptionType.UNKNOWN, "Timeout error"))
            })
            this.promises = []
            this.connectionId = uuid.v4();
            window.nativeConnections[this.connectionId] = this            
        }
    }

    receive(message: NativeMessage): void {
        const resolver = this.promises.shift();
        if (resolver) {
            clearTimeout(resolver.timeoutId)
            const data = Buffer.from(message.data, 'base64');
            resolver.resolve(data);
        }
        this.sendNextMessage()
    }

    private sendNextMessage(): void {
        const message = this.outBuffer.shift();
        if (message) {
            console.log("Sending next message")
            this.sendNativeRequest(message)
        }
    }

    private sendNativeRequest(nativeMessage: NativeMessage): void {
        if (window.AndroidWebViewRequest) {
            window.AndroidWebViewRequest(nativeMessage)
        } else if (window?.webkit?.messageHandlers?.iOSWebViewRequest?.postMessage) {
            window.webkit.messageHandlers.iOSWebViewRequest.postMessage(nativeMessage)
        } else {
            console.warn('No native APIs available');
        }
    }

    send(dataToSend: Buffer, context?: void | undefined): Promise<Buffer> {
        const id = this.connectionId
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const connection = this;
        return new Promise<Buffer>(function(res, rej): void {
            connection.promises.push({ 
                resolve: res,
                reject: rej,
                timeoutId: setTimeout(function() { connection.reset(id); }, ACTION_TIMEOUT_MS)
            });
            const message: NativeMessage = {
                data: dataToSend.toString("base64"),
                connectionId: id
            }
            if (connection.promises.length === 1) {
                console.log("Sending message immediately")
                connection.sendNativeRequest(message);
            } else {
                console.log("Queing message because others in flight")
                connection.outBuffer.push(message);
            }
        });
    }
}

class ThriftServer<T> {

    processor: ThriftProcessor<null, T>;

    receive({ connectionId, data }: NativeMessage) {
        const buffer = Buffer.from(data, 'base64');
        const inputTransport = new BufferedTransport(buffer);
        const outputTransport = new BufferedTransport();
        const inputProtocol = new CompactProtocol(inputTransport);
        const outputProtocol = new CompactProtocol(outputTransport);
        this.processor.process(inputProtocol, outputProtocol, null)
            .then((buffer: Buffer) => {
                const message: NativeMessage = {
                    data: buffer.toString("base64"),
                    connectionId
                }
                this.send(message);
            })
    }

    send(nativeMessage: NativeMessage): void {
        if (window.AndroidWebViewResponse) {
            window.AndroidWebViewResponse(nativeMessage)
        } else if (window?.webkit?.messageHandlers?.iOSWebViewResponse?.postMessage) {
            window.webkit.messageHandlers.iOSWebViewResponse.postMessage(nativeMessage)
        } else {
            console.warn('No native APIs available');
        }
    }

    constructor(processor: ThriftProcessor<null, T>) {
        this.processor = processor
        window.receiveNativeMessage = this.receive;
    }
}

new ThriftServer(new Webview.Processor(new WebviewHandler));



export function createAppClient<TClient extends ThriftClient<void>>(
    ServiceClient: IClientConstructor<TClient, void>, 
    transport: TransportType = 'buffered', 
    protocol: ProtocolType = 'compact'
): TClient {
    return new ServiceClient(new NativeConnection(getTransport(transport), getProtocol(protocol)));
}