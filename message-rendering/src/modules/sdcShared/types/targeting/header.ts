import { PageTracking } from './shared';

export type Edition = 'UK' | 'US' | 'AU' | 'INT';

export interface HeaderTargeting {
    showSupportMessaging: boolean;
    edition: Edition;
    countryCode: string;
    modulesVersion?: string;
    mvtId: number;
    lastOneOffContributionDate?: string;
    numArticles?: number;
}

export type HeaderPayload = {
    tracking: PageTracking;
    targeting: HeaderTargeting;
};
