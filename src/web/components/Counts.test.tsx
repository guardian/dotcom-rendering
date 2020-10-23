import React from 'react';
import { render } from '@testing-library/react';

import { useApi as useApi_ } from '@root/src/web/lib/api';
import { Counts } from './Counts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useApi: any = useApi_;

jest.mock('../lib/api', () => ({
    useApi: jest.fn(),
}));

describe('Counts', () => {
    const ajaxUrl = 'https://api.nextgen.guardianapps.co.uk';
    const pageId =
        '/environment/2020/jan/25/court-probe-carrie-symonds-influence-boris-johnson-badger-cull';

    beforeEach(() => {
        useApi.mockReset();
    });

    it('It should not render null if comments are disabled and share_count is zero', () => {
        useApi.mockReturnValue({
            data: { share_count: 0 },
        });

        const { container } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(container.firstChild).not.toBeNull();
    });

    it('It should not render anything if there was a share count error and comments are disabled', () => {
        useApi.mockReturnValue({ error: { message: 'Bad' } });

        const { container } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(container.firstChild).toBeNull();
    });

    it('It should still render the comment count even if the share count call failed', () => {
        useApi.mockReturnValue({ error: { message: 'Bad' } });

        const { getByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                commentCount={34}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(getByTestId('long-comment-count').innerHTML).toBe('34');
    });

    it('It should show the share count even if comments are disabled', () => {
        useApi.mockReturnValue({ data: { share_count: 100 } });

        const { getByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(getByTestId('long-share-count').innerHTML).toBe('100');
        expect(getByTestId('short-share-count').innerHTML).toBe('100');
    });

    it('It should format long share counts correctly', () => {
        useApi.mockReturnValue({ data: { share_count: 25000 } });

        const { getByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(getByTestId('long-share-count').innerHTML).toBe('25,000');
        expect(getByTestId('short-share-count').innerHTML).toBe('25k');
    });

    it('It should not show zero if the share count is zero', () => {
        useApi.mockReturnValue({
            data: { share_count: 0 },
        });

        const { queryAllByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                commentCount={1}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(queryAllByTestId('long-comment-count').length).toBe(1);
        expect(queryAllByTestId('short-share-count').length).toBe(0);
    });

    it('It should still render the comment component even if there are no comments', () => {
        useApi.mockReturnValue({
            data: { share_count: 80, counts: [{ id: 'abc', count: 0 }] },
        });

        const { queryAllByTestId, getByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                commentCount={0}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(queryAllByTestId('long-comment-count').length).toBe(1);
        expect(getByTestId('short-comment-count').innerHTML).toBe('0');
        expect(getByTestId('short-share-count').innerHTML).toBe('80');
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
                commentCount={1}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(queryAllByTestId('long-share-count').length).toBe(1);
        expect(queryAllByTestId('long-comment-count').length).toBe(1);
        expect(queryAllByTestId('numbers-border').length).toBe(1);
    });

    it('It should not render the border if both comments and shares are at zero', () => {
        useApi.mockReturnValue({
            data: { share_count: 0, counts: [{ id: 'abc', count: 90 }] },
        });

        const { queryAllByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                commentCount={0}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(queryAllByTestId('long-share-count').length).toBe(0);
        expect(queryAllByTestId('long-comment-count').length).toBe(1);
        expect(queryAllByTestId('numbers-border').length).toBe(0);
    });

    it('It should not render the border if comments are disabled', () => {
        useApi.mockReturnValue({
            data: { share_count: 80, counts: [{ id: 'abc', count: 0 }] },
        });

        const { queryAllByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(queryAllByTestId('long-share-count').length).toBe(1);
        expect(queryAllByTestId('long-comment-count').length).toBe(0);
        expect(queryAllByTestId('numbers-border').length).toBe(0);
    });

    it('It should format really long numbers correctly', () => {
        useApi.mockReturnValue({
            data: { share_count: 98460, counts: [{ id: 'abc', count: 78 }] },
        });

        const { getByTestId } = render(
            <Counts
                ajaxUrl={ajaxUrl}
                pageId={pageId}
                commentCount={1945}
                pillar="news"
                setIsExpanded={() => {}}
            />,
        );

        expect(getByTestId('long-comment-count').innerHTML).toBe('1,945');
        expect(getByTestId('long-share-count').innerHTML).toBe('98,460');
        expect(getByTestId('short-comment-count').innerHTML).toBe('1945');
        expect(getByTestId('short-share-count').innerHTML).toBe('98k');
    });
});
