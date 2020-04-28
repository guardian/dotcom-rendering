interface ExperimentModel<VariantData> {
    sticky: boolean;
    consentNotificationId?: string;
    variants: {
        [variantName: string]: VariantData;
    };
}

type AmpModel = ExperimentModel<number>;

type StyledExperimentModel = ExperimentModel<VariantConfig>;

interface VariantConfig {
    proportion: number;
    style: string;
}

interface ExperimentCollection<ExperimentObject> {
    [experimentName: string]: ExperimentObject;
}

export type AmpModelCollection = ExperimentCollection<AmpModel>;

export type StyledModelCollection = ExperimentCollection<StyledExperimentModel>;

type StylesCollection = ExperimentCollection<{ [variantName: string]: string }>;

const extractFromVariants = (
    variants: { [variantName: string]: VariantConfig },
    fieldName: keyof VariantConfig,
): { [variantName: string]: string | number } => {
    return Object.entries(variants).reduce((acc, [variantName, config]) => {
        acc = { ...acc, ...{ [variantName]: config[fieldName] } };
        return acc;
    }, {});
};

const isValidAmpModelVariant = (variant: {
    [variantName: string]: string | number;
}): variant is { [variantName: string]: number } => {
    return Object.values(variant).every(x => typeof x === 'number');
};

const isValidStyleVariant = (variant: {
    [variantName: string]: string | number;
}): variant is { [variantName: string]: string } => {
    return Object.values(variant).every(x => typeof x === 'string');
};

export const extractExperimentModels = (
    fullConfig: StyledModelCollection,
): AmpModelCollection => {
    return Object.entries(fullConfig).reduce(
        (extractedModels, [experimentName, styledModel]) => {
            const { variants, ...configWithoutVariants } = styledModel;
            const proportions = extractFromVariants(variants, 'proportion');
            if (isValidAmpModelVariant(proportions)) {
                extractedModels[experimentName] = {
                    ...configWithoutVariants,
                    ...{
                        variants: proportions,
                    },
                };
            }
            return extractedModels;
        },
        {} as AmpModelCollection,
    );
};

export const extractExperimentStyles = (
    fullConfig: StyledModelCollection,
): StylesCollection => {
    return Object.entries(fullConfig).reduce(
        (extractedModels, [experimentName, styledModel]) => {
            const { variants } = styledModel;
            const styles = extractFromVariants(variants, 'style');
            if (isValidStyleVariant(styles)) {
                extractedModels[experimentName] = { ...styles };
            }
            return extractedModels;
        },
        {} as StylesCollection,
    );
};

export const getActiveExperiments = (
    abTestObject: StyledModelCollection,
    switches: { [key: string]: boolean },
): StyledModelCollection => {
    return Object.entries(abTestObject).reduce(
        (acc, [testName, testConfig]) => {
            if (switches[testName]) {
                acc[testName] = testConfig;
            }
            return acc;
        },
        {} as StyledModelCollection,
    );
};

export const buildExperimentStyle = (experiments: StylesCollection): string => {
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

// export const extractProportionFromVariants = (variants: {
//     [variantName: string]: VariantConfig;
// }): { [variantName: string]: number } =>
//     Object.entries(variants).reduce((acc, [variantName, config]) => {
//         acc = { ...acc, ...{ [variantName]: config.proportion } };
//         return acc;
//     }, {});

// export const extractExperimentModels = (
//     fullConfig: StyledModelCollection,
// ): AmpModelCollection => {
//     return Object.entries(fullConfig).reduce(
//         (extractedModels, [experimentName, styledModel]) => {
//             const { variants, ...configWithoutVariants } = styledModel;
//             const proportions = extractProportionFromVariants(variants);
//             extractedModels[experimentName] = {
//                 ...configWithoutVariants,
//                 ...{
//                     variants: proportions,
//                 },
//             };
//             return extractedModels;
//         },
//         {} as AmpModelCollection,
//     );
// };

// const extractStyleFromVariants = (variants: {
//     [variantName: string]: VariantConfig;
// }): { [variantName: string]: string } =>
//     Object.entries(variants).reduce((acc, [variantName, config]) => {
//         acc = { ...acc, ...{ [variantName]: config.style } };
//         return acc;
//     }, {});
