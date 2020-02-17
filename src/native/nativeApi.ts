import { createAppClient } from './thrift/nativeConnection';
import * as Native from 'mobile-apps-thrift-typescript/Native';

const nativeClient: Native.Client<void> = createAppClient<Native.Client>(Native.Client, 'buffered', 'compact');

export { nativeClient };