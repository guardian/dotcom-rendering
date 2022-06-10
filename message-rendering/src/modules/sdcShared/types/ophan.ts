/**
 * Note - zod validators for these ophan types are in /props/shared.ts
 * This is to avoid including zod in the dotcom library
 */
export type OphanProduct =
    | 'CONTRIBUTION'
    | 'MEMBERSHIP_SUPPORTER'
    | 'DIGITAL_SUBSCRIPTION'
    | 'PRINT_SUBSCRIPTION';

export type OphanAction = 'CLICK' | 'VIEW' | 'INSERT';

export type OphanComponentType =
    | 'ACQUISITIONS_EPIC'
    | 'ACQUISITIONS_ENGAGEMENT_BANNER'
    | 'ACQUISITIONS_SUBSCRIPTIONS_BANNER'
    | 'ACQUISITIONS_HEADER'
    | 'ACQUISITIONS_OTHER';

export type OphanComponent = {
    componentType: OphanComponentType;
    id?: string;
    products?: OphanProduct[];
    campaignCode?: string;
    labels?: string[];
};

interface OphanAbTest {
    name: string;
    variant: string;
}

export type OphanComponentEvent = {
    component: OphanComponent;
    action: OphanAction;
    value?: string;
    id?: string;
    abTest?: OphanAbTest;
    targetingAbTest?: OphanAbTest;
};
