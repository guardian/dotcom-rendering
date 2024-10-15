import {
	Request as NodeFetchRequest,
	Response as NodeFetchResponse,
} from 'node-fetch';
import { mockFetch } from './mockRESTCalls';

global.Response = NodeFetchResponse as unknown as typeof Response;
global.Request = NodeFetchRequest as unknown as typeof Request;

export const jestMockFetch = (): void => {
	global.fetch = jest.fn(mockFetch);
};
