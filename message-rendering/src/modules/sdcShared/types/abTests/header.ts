import { UserCohort, Test, Variant } from './shared';
import { HeaderContent } from '../props';
import { CountryGroupId } from '../../lib';

export interface HeaderVariant extends Variant {
    name: string;
    content: HeaderContent;
    mobileContent?: HeaderContent;
    modulePathBuilder?: (version?: string) => string;
}

export interface HeaderTest extends Test<HeaderVariant> {
    name: string;
    isOn: boolean;
    locations: CountryGroupId[];
    userCohort: UserCohort;
    variants: HeaderVariant[];
}

export interface HeaderTestSelection {
    test: HeaderTest;
    variant: HeaderVariant;
    modulePathBuilder: (version?: string) => string;
}
