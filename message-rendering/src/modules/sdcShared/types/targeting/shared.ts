export type PageTracking = {
    ophanPageId: string;
    platformId: string;
    referrerUrl: string;
    clientName: string;
};

export type TagCounts = {
    [tag: string]: number;
};

export type WeeklyArticleLog = {
    week: number;
    count: number;
    tags?: TagCounts;
};

export type WeeklyArticleHistory = WeeklyArticleLog[];

/**
 * This interface is duplicated from the @guardian/libs definition of StorageFactory. This is to avoid adding the
 * whole library as a dependency.
 */
export interface LocalStorage {
    set(key: string, value: unknown): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(key: string): any;
}
