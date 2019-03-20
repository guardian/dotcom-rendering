import { _ } from './boot';
import { getRaven as getRaven_ } from '@frontend/web/browser/raven';
import { loadScript as loadScript_ } from '@frontend/web/browser/loadScript';

const getRaven: any = getRaven_;
const loadScript: any = loadScript_;

jest.mock('ophan-tracker-js', jest.fn());
jest.mock('@frontend/web/browser/raven', () => ({
    getRaven: jest.fn(),
}));
jest.mock('@frontend/web/browser/loadScript', () => ({
    loadScript: jest.fn(),
}));

describe('boot', () => {
    interface MockWindow extends Window {
        addEventListener: jest.Mock<{}> & typeof window.addEventListener;
        removeEventListener: jest.Mock<{}> & typeof window.removeEventListener;
    }
    interface MockRaven {
        context: jest.Mock<{}>;
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
    const commercialUrl = 'http://foo.bar';
    const { onPolyfilled, polyfilled, app } = window.guardian;

    beforeEach(() => {
        windowMock = mockWindow();
        ravenMock = mockRaven();

        window.guardian = Object.assign({}, window.guardian, {
            polyfilled: true,
            app: {
                data: {
                    config: {
                        commercialUrl,
                    },
                },
            },
        });

        getRaven.mockImplementation(() => Promise.resolve(ravenMock));
        loadScript.mockImplementation(() => Promise.resolve());
    });

    afterEach(() => {
        windowMock.addEventListener.mockClear();

        getRaven.mockReset();
        loadScript.mockReset();

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
            expect(ravenMock.context).toHaveBeenCalled();
            expect(ravenMock.context).toHaveBeenCalledWith(
                {
                    tags: {
                        feature: 'initApp',
                    },
                },
                expect.any(Function),
            );
            expect(loadScript).toHaveBeenCalledTimes(1);
            expect(loadScript).toHaveBeenCalledWith(commercialUrl);
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
            expect(loadScript).toHaveBeenCalledWith(commercialUrl);
            expect(windowMock.addEventListener).not.toHaveBeenCalled();
        });
    });
});
