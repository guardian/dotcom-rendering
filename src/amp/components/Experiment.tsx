import React from 'react';

export interface ExperimentModel {
    [key: string]: {
        sticky: boolean;
        consentNotificationId?: string;
        variants: {
            [key: string]: number; // We do this for compatibility with ExperimentModel via ExperimentConfig
        };
    };
}

interface StyledVariants {
    [key: string]: { proportion: number; style: string };
}

export interface ExperimentFullConfig {
    [key: string]: {
        sticky: boolean;
        consentNotificationId?: string;
        variants: StyledVariants;
    };
}

export interface ExperimentStyle {
    [key: string]: { [key: string]: string };
}

const extractStyleFromVariants = (
    variants: StyledVariants,
): [{ [key: string]: number }, { [key: string]: string }] =>
    Object.entries(variants).reduce(
        (acc, [variant, config]) => {
            const { proportion, style } = config;
            acc = [
                { ...acc[0], ...{ [variant]: proportion } },
                { ...acc[1], ...{ [variant]: style } },
            ];
            return acc;
        },
        [{}, {}],
    );

// TODO: Split this into two functions: one for Model and one for Style.

export const extractModelAndStyle = (
    fullConfig: ExperimentFullConfig,
): [ExperimentModel, ExperimentStyle] => {
    return Object.entries(fullConfig).reduce(
        (extracted, [experimentName, styledModel]) => {
            const { variants, ...configWithoutVariants } = styledModel;
            const [proportions, styles] = extractStyleFromVariants(variants);
            extracted[0][experimentName] = {
                ...configWithoutVariants,
                ...{ variants: proportions },
            };
            extracted[1][experimentName] = styles;
            return extracted;
        },
        [{}, {}] as [ExperimentModel, ExperimentStyle],
    );
};

export const getActiveExperiments = (
    abTestObject: ExperimentFullConfig,
    switches: { [key: string]: boolean },
): ExperimentFullConfig => {
    return Object.entries(abTestObject).reduce(
        (acc, [testName, testConfig]) => {
            if (switches[testName]) {
                acc[testName] = testConfig;
            }
            return acc;
        },
        {} as ExperimentFullConfig,
    );
};

export const buildExperimentStyle = (experiments: ExperimentStyle): string => {
    return Object.entries(experiments).reduce(
        (experimentStyleString, [experimentName, styleVariants]) => {
            const experimentStyle = Object.entries(styleVariants).reduce(
                (variantStyleString, [variantName, variantStyle]) => {
                    return `${variantStyleString} body[amp-x-${experimentName}='${variantName}'] ${variantStyle}`.trim();
                },
                '',
            );
            return `${experimentStyleString} ${experimentStyle}`.trim();
        },
        '',
    );
};

export const Experiment: React.FC<{
    experiment: ExperimentModel;
}> = experiment => {
    const script: string = `<amp-experiment>
        <script type="application/json">
        ${JSON.stringify(experiment.experiment)}
        </script>
    </amp-experiment>`;

    return <div dangerouslySetInnerHTML={{ __html: script }} />;
};
