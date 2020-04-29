// ----- Imports ----- //

import {
    BufferedTransport,
    CompactProtocol,
    TProtocol,
} from '@creditkarma/thrift-server-core';

import { Response as CapiResponse } from 'mapiThriftModels/Response';
import { Content as MapiContent } from 'mapiThriftModels/Content';
import { ErrorResponse } from 'mapiThriftModels/ErrorResponse';


// ----- Types ----- //

interface ThriftDecoder<A> {
    read(p: TProtocol): A;
}


// ----- Functions ----- //

const decodeContent = <A>(decoder: ThriftDecoder<A>) => (content: Buffer | undefined): A => {
    const transport = new BufferedTransport(content);
    const protocol = new CompactProtocol(transport);

    return decoder.read(protocol);
}

const capiDecoder = decodeContent(CapiResponse);
const errorDecoder = decodeContent(ErrorResponse);
const mapiDecoder = decodeContent(MapiContent);


// ----- Exports ----- //

export {
    capiDecoder,
    errorDecoder,
    mapiDecoder,
};
