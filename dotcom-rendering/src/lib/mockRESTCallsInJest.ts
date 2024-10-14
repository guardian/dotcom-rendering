import { Response as NodeFetchResponse } from 'node-fetch';
import { mockedFetch } from './mockRESTCalls';

global.Response = NodeFetchResponse as unknown as typeof Response;

export const mockFetch = () => {
	global.fetch = mockedFetch;
};

global.fetch = jest.fn();
