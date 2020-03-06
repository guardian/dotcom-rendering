import { createAppClient } from './thrift/nativeConnection';
import * as Native from 'bridget-typescript/Native';

const nativeClient: Native.Client<void> = createAppClient<Native.Client>(Native.Client, 'buffered', 'compact');

export { nativeClient };