import { createAppClient } from './thrift/NativeConnection';
import * as Native from 'mobile-apps-thrift-typescript/Native';

function nativeCall(command: string): Promise<string> {
    const client: Native.Client<void> = createAppClient<Native.Client>(Native.Client, 'buffered', 'compact')
    try {
        switch (command) {
            case 'insertAdverts':
                return client.insertAdverts([{ x: 0, y: 0, height: 100 }])
                    .then(result => `${result}`)
            default:
                return Promise.resolve('')
        }
    } catch(e) {
        console.error(e);
        return Promise.resolve('')
    }
} 

export { nativeCall };