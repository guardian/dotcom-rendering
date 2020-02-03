import React from 'react';
import { render } from '@testing-library/react';

import { useApi as useApi_ } from '@root/src/web/lib/api';
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

        const { getByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(getByTestId('long-share-count').innerHTML).toBe('100');
        expect(getByTestId('short-share-count').innerHTML).toBe('100');
    });

    it('It should format long Counts correctly', () => {
        useApi.mockReturnValue({ data: { share_count: 25000 } });

        const { getByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(getByTestId('long-share-count').innerHTML).toBe('25,000');
        expect(getByTestId('short-share-count').innerHTML).toBe('25k');
    });

    it('It should not render the share component if there are no shares', () => {
        useApi.mockReturnValue({
            data: { share_count: 0, counts: [{ id: 'abc', count: 280 }] },
        });

        const { queryAllByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(queryAllByTestId('long-comment-count').length).toBe(1);
        expect(queryAllByTestId('long-share-count').length).toBe(0);
    });

    it('It should not render the comment component if there are no comments', () => {
        useApi.mockReturnValue({
            data: { share_count: 80, counts: [{ id: 'abc', count: 0 }] },
        });

        const { queryAllByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(queryAllByTestId('long-comment-count').length).toBe(0);
        expect(queryAllByTestId('long-share-count').length).toBe(1);
    });

    it('It should only render the border if there are both comments and shares', () => {
        useApi.mockReturnValue({
            data: { share_count: 80, counts: [{ id: 'abc', count: 90 }] },
        });

        const { queryAllByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(queryAllByTestId('long-share-count').length).toBe(1);
        expect(queryAllByTestId('long-comment-count').length).toBe(1);
        expect(queryAllByTestId('numbers-border').length).toBe(1);
    });

    it('It should not render the border if there are only shares', () => {
        useApi.mockReturnValue({
            data: { share_count: 80, counts: [{ id: 'abc', count: 0 }] },
        });

        const { queryAllByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(queryAllByTestId('long-share-count').length).toBe(1);
        expect(queryAllByTestId('long-comment-count').length).toBe(0);
        expect(queryAllByTestId('numbers-border').length).toBe(0);
    });

    it('It should not render the border if there are only comments', () => {
        useApi.mockReturnValue({
            data: { share_count: 0, counts: [{ id: 'abc', count: 78 }] },
        });

        const { queryAllByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                shortUrlId={shortUrlId}
                pillar="news"
            />,
        );

        expect(queryAllByTestId('long-share-count').length).toBe(0);
        expect(queryAllByTestId('long-comment-count').length).toBe(1);
        expect(queryAllByTestId('numbers-border').length).toBe(0);
    });
});
