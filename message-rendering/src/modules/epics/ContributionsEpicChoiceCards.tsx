import React from 'react';
import { ChoiceCardGroup, ChoiceCard } from '@guardian/src-choice-card';
import { ChoiceCardAmounts, ContributionFrequency, OphanComponentEvent } from '../sdcShared/types';
import { getLocalCurrencySymbol, countryCodeToCountryGroupId } from '../sdcShared/lib';
import { css } from '@emotion/react';
import { until } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

const frequencyChoiceCardGroupOverrides = css`
    ${until.mobileLandscape} {
        > div {
            display: flex !important;
        }

        > div label:nth-of-type(2) {
            margin-left: 4px !important;
            margin-right: 4px !important;
        }
    }
`;

const hideChoiceCardGroupLegend = css`
    legend {
        ${visuallyHidden};
    }
`;

// This `position: relative` is necessary to stop it jumping to the top of the page when a button is clicked
const container = css`
    position: relative;
`;

export interface ChoiceCardSelection {
    frequency: ContributionFrequency;
    amount: number | 'other';
}

interface EpicChoiceCardProps {
    amounts: ChoiceCardAmounts;
    selection: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    countryCode?: string;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
}

export const ContributionsEpicChoiceCards: React.FC<EpicChoiceCardProps> = ({
    amounts,
    selection,
    setSelectionsCallback,
    countryCode,
    submitComponentEvent,
}: EpicChoiceCardProps) => {
    const currencySymbol = getLocalCurrencySymbol(countryCode);
    const countryGroupId = countryCodeToCountryGroupId(countryCode || 'GBPCountries');
    const amountsForCountryGroup = amounts[countryGroupId]['control'];

    const trackClick = (type: 'amount' | 'frequency'): void => {
        if (submitComponentEvent) {
            submitComponentEvent({
                component: {
                    componentType: 'ACQUISITIONS_OTHER',
                    id: `contributions-epic-choice-cards-change-${type}`,
                },
                action: 'CLICK',
            });
        }
    };

    const updateAmount = (amount: number | 'other') => {
        trackClick('amount');
        setSelectionsCallback({
            frequency: selection.frequency,
            amount: amount,
        });
    };

    const updateFrequency = (frequency: ContributionFrequency) => {
        trackClick('frequency');
        setSelectionsCallback({
            frequency: frequency,
            amount: amountsForCountryGroup[frequency]['amounts'][1],
        });
    };

    const frequencySuffix = () => {
        return {
            ONE_OFF: '',
            MONTHLY: ' per month',
            ANNUAL: ' per year',
        }[selection.frequency];
    };

    return (
        <div css={container}>
            <br />
            <ChoiceCardGroup
                name="contribution-frequency"
                columns={3}
                css={[frequencyChoiceCardGroupOverrides, hideChoiceCardGroupLegend]}
                label="Contribution frequency"
            >
                <ChoiceCard
                    label="Single"
                    value="one_off"
                    id="one_off"
                    checked={selection.frequency == 'ONE_OFF'}
                    onChange={() => updateFrequency('ONE_OFF')}
                />
                <ChoiceCard
                    label="Monthly"
                    value="monthly"
                    id="monthly"
                    checked={selection.frequency == 'MONTHLY'}
                    onChange={() => updateFrequency('MONTHLY')}
                />
                <ChoiceCard
                    label="Annual"
                    value="annual"
                    id="annual"
                    checked={selection.frequency == 'ANNUAL'}
                    onChange={() => updateFrequency('ANNUAL')}
                />
            </ChoiceCardGroup>
            <br />
            <ChoiceCardGroup
                name="contribution-amount"
                label="Contribution amount"
                css={hideChoiceCardGroupLegend}
            >
                <ChoiceCard
                    value="first"
                    label={`${currencySymbol}${
                        amountsForCountryGroup[selection.frequency]['amounts'][0]
                    }${frequencySuffix()}`}
                    id="first"
                    checked={
                        selection.amount ==
                        amountsForCountryGroup[selection.frequency]['amounts'][0]
                    }
                    onChange={() =>
                        updateAmount(amountsForCountryGroup[selection.frequency]['amounts'][0])
                    }
                />
                <ChoiceCard
                    value="second"
                    label={`${currencySymbol}${
                        amountsForCountryGroup[selection.frequency]['amounts'][1]
                    }${frequencySuffix()}`}
                    id="second"
                    checked={
                        selection.amount ==
                        amountsForCountryGroup[selection.frequency]['amounts'][1]
                    }
                    onChange={() =>
                        updateAmount(amountsForCountryGroup[selection.frequency]['amounts'][1])
                    }
                />
                <ChoiceCard
                    value="third"
                    label="Other"
                    id="third"
                    checked={selection.amount == 'other'}
                    onChange={() => updateAmount('other')}
                />
            </ChoiceCardGroup>
        </div>
    );
};
