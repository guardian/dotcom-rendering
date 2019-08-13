import { _ } from './boot';
import { getRaven as getRaven_ } from '@frontend/web/browser/raven';
import { loadScript as loadScript_ } from '@frontend/web/browser/loadScript';
import {
    init as initGa_,
    sendPageView as sendGaPageView_,
} from '@frontend/web/browser/ga';
import { sendOphanPlatformRecord as sendOphanPlatformRecord_ } from '@frontend/web/browser/ophan';
import { hydrate as hydrateCSS_ } from 'emotion';
import { hydrate as hydrateApp_ } from 'react-dom';
import { createElement as createElement_ } from 'react';
import { reportError as reportError_ } from '@frontend/web/browser/reportError';

const getRaven: any = getRaven_;
const loadScript: any = loadScript_;
const initGa: any = initGa_;
const sendGaPageView: any = sendGaPageView_;
const sendOphanPlatformRecord: any = sendOphanPlatformRecord_;
const hydrateCSS: any = hydrateCSS_;
const hydrateApp: any = hydrateApp_;
const createElement: any = createElement_;
const reportError: any = reportError_;

jest.mock('ophan-tracker-js', jest.fn());
jest.mock('@frontend/web/browser/raven', () => ({
    getRaven: jest.fn(),
}));
jest.mock('@frontend/web/browser/loadScript', () => ({
    loadScript: jest.fn(),
}));
jest.mock('@frontend/web/browser/ga', () => ({
    init: jest.fn(),
    sendPageView: jest.fn(),
}));
jest.mock('@frontend/web/browser/ophan', () => ({
    sendOphanPlatformRecord: jest.fn(),
}));
jest.mock('emotion', () => ({
    hydrate: jest.fn(),
}));
jest.mock('react-dom', () => ({
    hydrate: jest.fn(),
}));
jest.mock('react', () => ({
    createElement: jest.fn(),
}));
jest.mock('@frontend/web/pages/Article', () => ({
    Article: `<h1>hello world</h1>`,
}));
jest.mock('@frontend/web/browser/reportError', () => ({
    reportError: jest.fn(),
}));

describe('boot', () => {
    interface MockWindow extends Window {
        addEventListener: jest.Mock<{}> & typeof window.addEventListener;
        removeEventListener: jest.Mock<{}> & typeof window.removeEventListener;
    }
    interface MockRaven {
        context: jest.Mock<any>;
        captureException: jest.Mock<{}>;
    }
    const mockWindow = (): MockWindow => {
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();
        return window as MockWindow;
    };
    const mockRaven = (): MockRaven => {
        const raven: MockRaven = {
            context: jest.fn((config, callback) => {
                callback();
            }),
            captureException: jest.fn(),
        };

        return raven;
    };
    let windowMock: MockWindow;
    let ravenMock: MockRaven;
    const commercialBundleUrl = 'http://foo.bar';
    const { onPolyfilled, polyfilled, app } = window.guardian;

    beforeEach(() => {
        windowMock = mockWindow();
        ravenMock = mockRaven();

        window.guardian = Object.assign({}, window.guardian, {
            polyfilled: true,
            app: {
                data: {
                    config: {
                        commercialBundleUrl,
                    },
                },
                cssIDs: ['foo', 'bar'],
            },
            config: {},
        });

        getRaven.mockImplementation(() => Promise.resolve(ravenMock));
        loadScript.mockImplementation(() => Promise.resolve());
    });

    afterEach(() => {
        windowMock.addEventListener.mockClear();

        getRaven.mockReset();
        loadScript.mockReset();
        initGa.mockReset();
        sendGaPageView.mockReset();
        sendOphanPlatformRecord.mockReset();
        hydrateCSS.mockReset();
        hydrateApp.mockReset();
        createElement.mockReset();

        window.guardian = Object.assign({}, window.guardian, {
            onPolyfilled,
            polyfilled,
            app,
        });
    });

    test('does not call onPollyfilled when window.guardian.polyfilled is false', () => {
        const onPolyfilledMock = jest.fn();

        window.guardian.polyfilled = false;
        window.guardian.onPolyfilled = onPolyfilledMock;

        _.run();

        expect(onPolyfilledMock).not.toBeCalled();
    });

    test('if getRaven successful initAppWithRaven', () => {
        return _.onPolyfilled().then(() => {
            expect(ravenMock.context).toHaveBeenCalledTimes(1);
            expect(ravenMock.context).toHaveBeenCalledWith(
                {
                    tags: {
                        feature: 'initApp',
                    },
                },
                expect.any(Function),
            );
            expect(loadScript).toHaveBeenCalledTimes(1);
            expect(loadScript).toHaveBeenCalledWith(commercialBundleUrl);
            expect(windowMock.addEventListener).toHaveBeenCalledTimes(2);
            expect(windowMock.addEventListener).toHaveBeenCalledWith(
                'error',
                expect.any(Function),
            );
            expect(windowMock.addEventListener).toHaveBeenCalledWith(
                'unhandledrejection',
                expect.any(Function),
            );
        });
    });

    test('if getRaven unsuccessful initApp without Raven', () => {
        getRaven.mockReturnValueOnce(Promise.reject());

        return _.onPolyfilled().then(() => {
            expect(ravenMock.context).not.toHaveBeenCalled();
            expect(loadScript).toHaveBeenCalledTimes(1);
            expect(loadScript).toHaveBeenCalledWith(commercialBundleUrl);
            expect(windowMock.addEventListener).not.toHaveBeenCalled();
        });
    });

    describe('enhances application', () => {
        let cssIDs: string[];
        let data: object;
        const container = document.createElement('div');
        container.id = 'app';

        beforeEach(() => {
            cssIDs = window.guardian.app.cssIDs;
            data = window.guardian.app.data;
            process.env.NODE_ENV = 'production';
            document.body.appendChild(container);
        });

        afterEach(() => {
            expect(initGa).toHaveBeenCalledTimes(1);
            expect(sendGaPageView).toHaveBeenCalledTimes(1);
            expect(sendOphanPlatformRecord).toHaveBeenCalledTimes(1);
            expect(hydrateCSS).toHaveBeenCalledTimes(1);
            expect(hydrateCSS).toHaveBeenCalledWith(cssIDs);
            expect(hydrateApp).toHaveBeenCalledTimes(1);
            expect(createElement).toHaveBeenCalledTimes(1);
            expect(createElement).toHaveBeenCalledWith('<h1>hello world</h1>', {
                data,
            });
            document.body.removeChild(container);
        });

        test('if loadCommercial successful enhanceApp', () => {
            return _.onPolyfilled();
        });

        test('if loadCommercial unsuccessful reportError and enhanceApp', () => {
            const errMessage = 'load script fail';
            loadScript.mockReturnValueOnce(Promise.reject(errMessage));

            return _.onPolyfilled().then(() => {
                expect(reportError).toHaveBeenCalledTimes(1);
                expect(reportError).toHaveBeenCalledWith(
                    errMessage,
                    {
                        feature: 'commercial',
                    },
                    false,
                );
            });
        });
    });
});
