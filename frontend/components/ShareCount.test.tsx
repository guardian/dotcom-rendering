import React from 'react';
import { shallow } from 'enzyme';
import { ShareCount } from './ShareCount';
import { CAPI } from '../../test/fixtures/CAPI';

const fetchResult: (shareCount: number) => Promise<{}> = shareCount =>
    Promise.resolve({
        ok: true,
        json: () => ({
            share_count: shareCount,
        }),
    });

describe('ShareCount', () => {
    const globalAny: any = global;
    const config: ConfigType = {
        ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
    };

    afterEach(() => {
        const { pageId } = CAPI;
        const { ajaxUrl } = config;

        expect(globalAny.fetch).toHaveBeenCalledWith(
            `${ajaxUrl}/sharecount/${pageId}.json`,
        );
    });

    describe('snapshots', () => {
        it('It should not render if state.shareCount is falsy', async () => {
            const fakeFetch = fetchResult(0);

            globalAny.fetch = jest.fn().mockImplementation(() => fakeFetch);

            const component = shallow(
                <ShareCount config={config} CAPI={CAPI} />,
            );

            await fakeFetch;
            await component.update();

            expect(component).toMatchSnapshot();
        });

        it('It should render if state.shareCount is truthy', async () => {
            const fakeFetch = fetchResult(100);

            globalAny.fetch = jest.fn().mockImplementation(() => fakeFetch);

            const component = shallow(
                <ShareCount config={config} CAPI={CAPI} />,
            );

            await fakeFetch;
            await component.update();

            expect(component).toMatchSnapshot();
        });

        it('It should format long shareCount correctly', async () => {
            const fakeFetch = fetchResult(25000);

            globalAny.fetch = jest.fn().mockImplementation(() => fakeFetch);

            const component = shallow(
                <ShareCount config={config} CAPI={CAPI} />,
            );

            await fakeFetch;
            await component.update();

            expect(component).toMatchSnapshot();
        });
    });

    it('It should render null if state.shareCount is falsy', async () => {
        const fakeFetch = fetchResult(0);

        globalAny.fetch = jest.fn().mockImplementation(() => fakeFetch);

        const component = shallow(<ShareCount config={config} CAPI={CAPI} />);

        await fakeFetch;
        await component.update();

        expect(component.type()).toBeNull();
        expect(component.state('shareCount')).toBe(0);
    });

    it('It should render if state.shareCount is truthy', async () => {
        const fakeFetch = fetchResult(100);

        globalAny.fetch = jest.fn().mockImplementation(() => fakeFetch);

        const component = shallow(<ShareCount config={config} CAPI={CAPI} />);

        await fakeFetch;
        await component.update();

        expect(component.type()).not.toBeNull();
        expect(component.state('shareCount')).toBe(100);
        expect(component.find('.js-countFull').text()).toBe('100');
        expect(component.find('.js-countShort').text()).toBe('100');
    });

    it('It should format long shareCount correctly', async () => {
        const fakeFetch = fetchResult(25000);

        globalAny.fetch = jest.fn().mockImplementation(() => fakeFetch);

        const component = shallow(<ShareCount config={config} CAPI={CAPI} />);

        await fakeFetch;
        await component.update();

        expect(component.type()).not.toBeNull();
        expect(component.state('shareCount')).toBe(25000);
        expect(component.find('.js-countFull').text()).toBe('25,000');
        expect(component.find('.js-countShort').text()).toBe('25k');
    });
});
