import { 
    BufferedTransport,
    CompactProtocol,
    ThriftProcessor
} from '@creditkarma/thrift-server-core'
import { Message } from './message';

declare global {
    interface Window {
        AndroidWebViewRequest?: (message: Message) => {};
        AndroidNativeResponse?: (message: Message) => {};
        webkit: {
            messageHandlers: {
                iOSWebViewRequest: {
                    postMessage: (message: Message) => {};
                };
                iOSNativeResponse: {
                    postMessage: (message: Message) => {};
                };
            };
        };
        receiveNativeRequest: (message: Message) => void;
    }
}

export class WebviewServer<T> {
    processor: ThriftProcessor<null, T>;

    receive({ connectionId, data }: Message): void {
        const buffer = Buffer.from(data, 'base64');
        const inputTransport = new BufferedTransport(buffer);
        const outputTransport = new BufferedTransport();
        const inputProtocol = new CompactProtocol(inputTransport);
        const outputProtocol = new CompactProtocol(outputTransport);
        
        this.processor.process(inputProtocol, outputProtocol)
            .then((buffer: Buffer) => {
                const message: Message = {
                    data: buffer.toString("base64"),
                    connectionId
                }
                this.send(message);
            })
    }

    send(message: Message): void {
        if (window.AndroidNativeResponse) {
            window.AndroidNativeResponse(message)
        } else if (window?.webkit?.messageHandlers?.iOSNativeResponse?.postMessage) {
            window.webkit.messageHandlers.iOSNativeResponse.postMessage(message)
        } else {
            console.warn('No native APIs available');
        }
    }

    constructor(processor: ThriftProcessor<null, T>) {
        this.processor = processor;
    }
}