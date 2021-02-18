// ----- Imports ----- //

import { RenderingRequestSerde } from '@guardian/apps-rendering-api-models/renderingRequest';
import { ContentSerde } from '@guardian/content-api-models/v1/content';
import { ErrorResponseSerde } from '@guardian/content-api-models/v1/errorResponse';
import { ItemResponseSerde } from '@guardian/content-api-models/v1/itemResponse';
import { TBufferedTransport, TCompactProtocol } from 'thrift';
import type { TProtocol, TTransport } from 'thrift';

// ----- Types ----- //

interface ThriftDecoder<A> {
	read(p: TProtocol): A;
}

// ----- Functions ----- //

async function toTransport(buffer: Buffer): Promise<TTransport> {
	return new Promise((resolve, reject) => {
		const writer = TBufferedTransport.receiver((transport, seqID) => {
			resolve(transport);
		}, 0);
		writer(buffer);
	});
}

const decodeContent = <A>(decoder: ThriftDecoder<A>) => async (
	content: Buffer | undefined,
): Promise<A> => {
	if (content) {
		const transport = await toTransport(content);
		const protocol = new TCompactProtocol(transport);

		return decoder.read(protocol);
	} else {
		return Promise.reject('Invalid request');
	}
};

const capiContentDecoder = decodeContent(ContentSerde);
const capiDecoder = decodeContent(ItemResponseSerde);
const errorDecoder = decodeContent(ErrorResponseSerde);
const mapiDecoder = decodeContent(RenderingRequestSerde);

// ----- Exports ----- //

export { capiDecoder, capiContentDecoder, errorDecoder, mapiDecoder };
