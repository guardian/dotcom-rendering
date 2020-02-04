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
    CompactProtocol
} from '@creditkarma/thrift-server-core'

import * as uuid from 'uuid';
import * as Webview from 'mobile-apps-thrift-typescript/Webview';
import { WebviewHandler } from 'native/webviewApi';

declare global {
    interface Window {
        nativeConnections: { [id: string]: NativeConnection };
        AndroidWebViewMessage?: (nativeMessage: NativeMessage) => {};
        webkit: {
            messageHandlers: {
                iOSWebViewMessage: {
                    postMessage: (nativeMessage: NativeMessage) => {};
                };
            };
        };
        receiveiOSMessage: (buffer: Buffer) => void;
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
    if (window.AndroidWebViewMessage) {
        window.AndroidWebViewMessage(nativeMessage)
    } else if (window?.webkit?.messageHandlers?.iOSWebViewMessage?.postMessage) {
        window.webkit.messageHandlers.iOSWebViewMessage.postMessage(nativeMessage)
    } else {
        console.warn('No native APIs available');
    }
}

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
            sendNativeMessage(message)
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
                sendNativeMessage(message);
            } else {
                console.log("Queing message because others in flight")
                connection.outBuffer.push(message);
            }
        });
    }
}

function receiveiOSMessage(buffer: Buffer): void {
    const transport = new BufferedTransport(buffer);
    const protocol = new CompactProtocol(transport);
    const processor = new Webview.Processor(new WebviewHandler);
    processor.process(protocol, protocol, null);
}

window.receiveiOSMessage = receiveiOSMessage;

export function createAppClient<TClient extends ThriftClient<void>>(
    ServiceClient: IClientConstructor<TClient, void>, 
    transport: TransportType = 'buffered', 
    protocol: ProtocolType = 'compact'
): TClient {
    return new ServiceClient(new NativeConnection(getTransport(transport), getProtocol(protocol)));
}