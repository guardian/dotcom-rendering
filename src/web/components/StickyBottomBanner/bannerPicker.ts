import { record } from '@root/src/web/browser/ophan/ophan';

export type MaybeFC = React.FC | null;
type ShowBanner = (meta?: any) => MaybeFC;

export type CanShowResult = {
    result: boolean;
    meta?: any;
};

export type Banner = {
    id: string;
    show: ShowBanner;
    canShow: () => Promise<CanShowResult>;
    timeoutMillis: number | null;
};

type BannerWithTimeout = Banner & {
    cancelTimeout: () => void;
};

export type BannerConfig = Banner[];

const recordBannerTimeoutInOphan = (bannerId: string) =>
    record({
        component: 'banner-picker-timeout-dcr',
        value: bannerId,
    });

const timeoutify = (banner: Banner): BannerWithTimeout => {
    let timer: number | undefined;

    const canShow = (): Promise<CanShowResult> =>
        new Promise((resolve) => {
            if (banner.timeoutMillis) {
                timer = window.setTimeout(() => {
                    recordBannerTimeoutInOphan(banner.id);
                    resolve({ result: false });
                }, banner.timeoutMillis);
            }

            banner.canShow().then((result) => resolve(result));
        });

    const cancelTimeout = () => timer && clearTimeout(timer);

    return {
        ...banner,
        canShow,
        cancelTimeout,
    };
};

const clearAllTimeouts = (banners: BannerWithTimeout[]) =>
    banners.map((b) => b.cancelTimeout());

const defaultShow = () => null;

type WinningBanner = {
    idx: number;
    meta?: any;
};

export const pickBanner = (banners: BannerConfig): Promise<() => MaybeFC> =>
    new Promise((resolve) => {
        const bannersWithTimeout = banners.map(timeoutify);
        const results = bannersWithTimeout.map((banner) => banner.canShow());

        const winner: Promise<WinningBanner> = results.reduce(
            async (winningBannerSoFar, canShow, idx) => {
                const runningIdx = (await winningBannerSoFar).idx;
                if (runningIdx >= 0) {
                    return winningBannerSoFar;
                }

                const result = await canShow;
                bannersWithTimeout[idx].cancelTimeout();
                if (result.result) {
                    return { idx, meta: result.meta };
                }

                return winningBannerSoFar;
            },
            Promise.resolve({ idx: -1 }),
        );

        winner.then(({ idx, meta }: WinningBanner) => {
            clearAllTimeouts(bannersWithTimeout);
            resolve(
                idx === -1
                    ? defaultShow
                    : () => bannersWithTimeout[idx].show(meta),
            );
        });
    });
