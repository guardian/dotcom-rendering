import {
	Request as NodeFetchRequest,
	Response as NodeFetchResponse,
} from 'node-fetch';
import { mockedFetch } from './mockRESTCalls';

global.Response = NodeFetchResponse as unknown as typeof Response;
global.Request = NodeFetchRequest as unknown as typeof Request;

export const mockFetch = (): void => {
	global.fetch = mockedFetch;
};

global.fetch = jest.fn();
