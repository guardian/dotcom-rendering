import React from 'react';
import { render, wait, waitForElement } from 'react-testing-library';
import { ShareCount } from './ShareCount';
import { CAPI } from '@root/fixtures/CAPI';

const fetchResult: (
    shareCount: number,
) => {
    ok: boolean;
    json: () => {
        share_count: number;
    };
} = shareCount => ({
    ok: true,
    json: () => ({
        share_count: shareCount,
    }),
});

describe('ShareCount', () => {
    const globalAny: any = global;
    const config: ConfigType = {
        ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
        sentryHost: '',
        sentryPublicApiKey: '',
        switches: {},
        dfpAccountId: '',
        commercialUrl: '',
    };

    afterEach(() => {
        const { pageId } = CAPI;
        const { ajaxUrl } = config;

        expect(globalAny.fetch).toHaveBeenCalledWith(
            `${ajaxUrl}/sharecount/${pageId}.json`,
        );
    });

    it('It should render null if state.shareCount is falsy', async () => {
        globalAny.fetch = jest.fn(async () => fetchResult(0));

        const { container } = render(
            <ShareCount config={config} pageId={CAPI.pageId} />,
        );

        await wait(() => expect(container.firstChild).toBeNull());
    });

    it('It should render if state.shareCount is truthy', async () => {
        globalAny.fetch = jest.fn(async () => fetchResult(100));

        const { container, getByTestId } = render(
            <ShareCount config={config} pageId={CAPI.pageId} />,
        );

        await waitForElement(() => getByTestId('countFull'));

        expect(container.firstChild).not.toBeNull();
        expect(getByTestId('countFull').innerHTML).toBe('100');
        expect(getByTestId('countShort').innerHTML).toBe('100');
    });

    it('It should format long shareCount correctly', async () => {
        globalAny.fetch = jest.fn(async () => fetchResult(25000));

        const { container, getByTestId } = render(
            <ShareCount config={config} pageId={CAPI.pageId} />,
        );

        await waitForElement(() => getByTestId('countFull'));

        expect(container.firstChild).not.toBeNull();
        expect(getByTestId('countFull').innerHTML).toBe('25,000');
        expect(getByTestId('countShort').innerHTML).toBe('25k');
    });
});
