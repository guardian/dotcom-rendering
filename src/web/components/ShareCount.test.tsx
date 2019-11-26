import React from 'react';
import { render } from '@testing-library/react';
import { CAPI } from '@root/fixtures/CAPI';

import { useApi as useApi_ } from '@root/src/web/components/lib/api';
import { ShareCount } from './ShareCount';

const useApi: any = useApi_;

jest.mock('@frontend/web/components/lib/api', () => ({
    useApi: jest.fn(),
}));

describe('ShareCount', () => {
    const ajaxUrl = 'https://api.nextgen.guardianapps.co.uk';

    const { pageId } = CAPI;

    beforeEach(() => {
        useApi.mockReset();
    });

    it('It should render null if share_count is falsy', () => {
        useApi.mockReturnValue({ data: { share_count: 0 } });

        const { container } = render(
            <ShareCount ajaxUrl={ajaxUrl} pageId={CAPI.pageId} />,
        );

        expect(useApi).toHaveBeenCalledWith(
            `${ajaxUrl}/sharecount/${pageId}.json`,
        );

        expect(container.firstChild).toBeNull();
    });

    it('It should render null if there is an error', () => {
        useApi.mockReturnValue({ error: { message: 'Bad' } });

        const { container } = render(
            <ShareCount ajaxUrl={ajaxUrl} pageId={CAPI.pageId} />,
        );

        expect(useApi).toHaveBeenCalledWith(
            `${ajaxUrl}/sharecount/${pageId}.json`,
        );

        expect(container.firstChild).toBeNull();
    });

    it('It should render if share_count is truthy', () => {
        useApi.mockReturnValue({ data: { share_count: 100 } });

        const { container, getByTestId } = render(
            <ShareCount ajaxUrl={ajaxUrl} pageId={CAPI.pageId} />,
        );

        expect(useApi).toHaveBeenCalledWith(
            `${ajaxUrl}/sharecount/${pageId}.json`,
        );

        expect(container.firstChild).not.toBeNull();
        expect(getByTestId('countFull').innerHTML).toBe('100');
        expect(getByTestId('countShort').innerHTML).toBe('100');
    });

    it('It should format long shareCount correctly', () => {
        useApi.mockReturnValue({ data: { share_count: 25000 } });

        const { container, getByTestId } = render(
            <ShareCount ajaxUrl={ajaxUrl} pageId={CAPI.pageId} />,
        );

        expect(useApi).toHaveBeenCalledWith(
            `${ajaxUrl}/sharecount/${pageId}.json`,
        );

        expect(container.firstChild).not.toBeNull();
        expect(getByTestId('countFull').innerHTML).toBe('25,000');
        expect(getByTestId('countShort').innerHTML).toBe('25k');
    });
});
