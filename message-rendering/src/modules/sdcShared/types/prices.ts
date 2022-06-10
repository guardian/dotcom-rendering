import { CountryGroupId } from '../lib';

export type RatePlan = 'Monthly' | 'Annual';
type ProductPriceData = {
    [ratePlan in RatePlan]: {
        price: string;
    };
};
export type GuardianProduct = 'GuardianWeekly' | 'Digisub';
type CountryGroupPriceData = {
    [product in GuardianProduct]: ProductPriceData;
};
export type Prices = {
    [country in CountryGroupId]: CountryGroupPriceData;
};
