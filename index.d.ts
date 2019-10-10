import { WindowGuardianConfig } from '@frontend/model/window-guardian';

declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface Window {
        guardian: {
            app: {
                data: any;
                cssIDs: string[];
            };
            mustardCut: boolean;
            polyfilled: boolean;
            onPolyfilled: () => void;
            queue: Array<() => void>;
            config: WindowGuardianConfig;
            ophan: {
                setEventEmitter: () => void; // We don't currently have a custom eventEmitter on DCR - like 'mediator' in Frontend.
                trackComponentAttention: (
                    name: string,
                    el: Element,
                    visiblityThreshold: number,
                ) => void;
                record: ({}) => void;
                viewId: string;
                pageViewId: string;
            };
            modules: {
                raven: {
                    reportError: (
                        err: Error,
                        tags: { [key: string]: string },
                    ) => void;
                };
            };
        };
        GoogleAnalyticsObject: string;
        ga: UniversalAnalytics.ga;
    }
}

/*~ this line is required as per TypeScript's global-modifying-module.d.ts instructions */
export {};
