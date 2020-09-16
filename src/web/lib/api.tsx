import { useState, useEffect } from 'react';

// Not meant to be an exhaustive type definition of the fetch API,
// just a starting point to get us going on 99% of our possible use cases
interface FetchOptions {
    method?:
        | 'GET'
        | 'HEAD'
        | 'POST'
        | 'PUT'
        | 'DELETE'
        | 'CONNECT'
        | 'OPTIONS'
        | 'TRACE'
        | 'PATCH';
    headers?: {
        'Content-Type':
            | 'text/plain'
            | 'multipart/form-data'
            | 'application/json'
            | 'application/x-www-form-urlencoded';
    };
    body?: string;
    credentials?: 'omit' | 'include' | 'same-origin';
}

function checkForErrors(response: any) {
    if (!response.ok) {
        throw Error(
            response.statusText ||
                `useApi | An api call returned HTTP status ${response.status}`,
        );
    }
    return response;
}

export const callApi = (url: string, options?: FetchOptions) => {
    return fetch(url, options)
        .then(checkForErrors)
        .then((response) => response.json());
};

interface ApiResponse<T> {
    loading: boolean;
    data?: T;
    error?: Error;
}

export const useApi = <T,>(
    url: string,
    options?: FetchOptions,
): ApiResponse<T> => {
    const [request, setRequest] = useState<{
        loading: boolean;
        data?: T;
        error?: Error;
    }>({
        loading: true,
    });

    useEffect(() => {
        callApi(url, options)
            .then((data) => {
                setRequest({
                    data,
                    loading: false,
                });
            })
            .catch((error) => {
                setRequest({
                    error,
                    loading: false,
                });
            });
    }, [url, options]);

    return request;
};
