import React from 'react';
import { render } from '@testing-library/react';

import { useApi as useApi_ } from '@root/src/web/components/lib/api';
import { Counts } from './Counts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useApi: any = useApi_;

jest.mock('@frontend/web/components/lib/api', () => ({
    useApi: jest.fn(),
}));

describe('Counts', () => {
    const ajaxUrl = 'https://api.nextgen.guardianapps.co.uk';
    const pageId =
        '/environment/2020/jan/25/court-probe-carrie-symonds-influence-boris-johnson-badger-cull';
    const shortUrlId = '/p/4k83z';

    beforeEach(() => {
        useApi.mockReset();
    });

    it('It should render null if share_count is falsy', () => {
        useApi.mockReturnValue({
            data: { share_count: 0, counts: [{ id: 'abc', count: 0 }] },
        });

        const { container } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(container.firstChild).toBeNull();
    });

    it('It should render null if there is an error', () => {
        useApi.mockReturnValue({ error: { message: 'Bad' } });

        const { container } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(container.firstChild).toBeNull();
    });

    it('It should render if share_count is truthy', () => {
        useApi.mockReturnValue({ data: { share_count: 100 } });

        const { container, getByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(container.firstChild).not.toBeNull();
        expect(getByTestId('long-share-count').innerHTML).toBe('100');
        expect(getByTestId('short-share-count').innerHTML).toBe('100');
    });

    it('It should format long Counts correctly', () => {
        useApi.mockReturnValue({ data: { share_count: 25000 } });

        const { container, getByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(container.firstChild).not.toBeNull();
        expect(getByTestId('long-share-count').innerHTML).toBe('25,000');
        expect(getByTestId('short-share-count').innerHTML).toBe('25k');
    });
});
