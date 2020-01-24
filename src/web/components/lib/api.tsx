import { useState, useEffect } from 'react';

function checkForErrors(response: any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const callApi = (url: string, body?: object) => {
    // If a `body` object has been passed in, assume POST request using that data
    // Otherwise, default to basic GET request
    const fetchPromise =
        typeof body === 'object'
            ? fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify(body),
              })
            : fetch(url);

    return fetchPromise.then(checkForErrors).then(response => response.json());
};

export function useApi<T>(url: string, body?: object) {
    const [request, setRequest] = useState<{
        loading: boolean;
        data?: T;
        error?: Error;
    }>({
        loading: true,
    });

    useEffect(() => {
        callApi(url, body)
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
