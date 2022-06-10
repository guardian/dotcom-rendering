import { TickerCountType, TickerData } from '@sdc/shared/types';

const tickerUrl = (countType: TickerCountType): string =>
    countType === TickerCountType.people
        ? 'https://support.theguardian.com/supporters-ticker.json'
        : 'https://support.theguardian.com/ticker.json';

const checkForErrors = (response: Response): Promise<Response> => {
    if (!response.ok) {
        return Promise.reject(
            response.statusText || `Ticker api call returned HTTP status ${response.status}`,
        );
    }
    return Promise.resolve(response);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parse = (json: any): Promise<TickerData> => {
    const total = parseInt(json.total, 10);
    const goal = parseInt(json.goal, 10);

    if (!Number.isNaN(total) && !Number.isNaN(goal)) {
        return Promise.resolve({
            total,
            goal,
        });
    }
    return Promise.reject(Error(`Failed to parse ticker data: ${json}`));
};

export const fetchTickerData = (tickerType: TickerCountType): Promise<TickerData> =>
    fetch(tickerUrl(tickerType))
        .then(response => checkForErrors(response))
        .then(response => response.json())
        .then(parse);
