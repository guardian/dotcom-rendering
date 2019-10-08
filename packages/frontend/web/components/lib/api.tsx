import { useState, useEffect } from 'react';

function checkForErrors(response: any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const callApi = (url: string) => {
    return fetch(url)
        .then(checkForErrors)
        .then(response => response.json());
};

export function useApi<T>(url: string) {
    const [request, setRequest] = useState<{
        loading: boolean;
        data?: T;
        error?: Error;
    }>({
        loading: true,
    });

    useEffect(() => {
        callApi(url)
            .then(data => {
                setRequest({
                    data,
                    loading: false,
                });
            })
            .catch(error => {
                setRequest({
                    error,
                    loading: false,
                });
            });
    }, [url]);

    return request;
}
