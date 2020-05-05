interface Experiment<VariantData> {
    sticky: boolean;
    consentNotificationId?: string;
    variants: {
        [variantName: string]: VariantData;
    };
}

type AmpExperiment = Experiment<number>;

type StyledExperiment = Experiment<VariantConfig>;

interface VariantConfig {
    proportion: number;
    style: string;
}

interface ExperimentCollection<ExperimentObject> {
    [experimentName: string]: ExperimentObject;
}

export type AmpExperimentCollection = ExperimentCollection<AmpExperiment>;

export type StyledExperimentCollection = ExperimentCollection<StyledExperiment>;

type StylesCollection = ExperimentCollection<{ [variantName: string]: string }>;

const extractProportionFromVariants = (variants: {
    [variantName: string]: VariantConfig;
}): { [variantName: string]: number } =>
    Object.entries(variants).reduce(
        (variantProportions, [variantName, config]) => ({
            ...variantProportions,
            [variantName]: config.proportion,
        }),
        {},
    );

export const extractExperimentModels = (
    fullConfig: StyledExperimentCollection,
): AmpExperimentCollection => {
    return Object.entries(fullConfig).reduce(
        (extractedModels, [experimentName, styledModel]) => {
            const { variants, ...configWithoutVariants } = styledModel;
            const proportions = extractProportionFromVariants(variants);

            return {
                ...extractedModels,
                [experimentName]: {
                    ...configWithoutVariants,
                    ...{
                        variants: proportions,
                    },
                },
            };
        },
        {} as AmpExperimentCollection,
    );
};

const extractStyleFromVariants = (variants: {
    [variantName: string]: VariantConfig;
}): { [variantName: string]: string } =>
    Object.entries(variants).reduce(
        (variantStyles, [variantName, config]) => ({
            ...variantStyles,
            [variantName]: config.style,
        }),
        {},
    );

export const extractStylesFromExperiments = (
    fullConfig: StyledExperimentCollection,
): StylesCollection => {
    return Object.entries(fullConfig).reduce(
        (extractedModels, [experimentName, styledModel]) => {
            const { variants } = styledModel;
            const styles = extractStyleFromVariants(variants);
            return { ...extractedModels, [experimentName]: styles };
        },
        {} as StylesCollection,
    );
};

export const filterActiveExperiments = (
    abTestObject: StyledExperimentCollection,
    switches: { [key: string]: boolean },
): StyledExperimentCollection => {
    return Object.entries(abTestObject).reduce(
        (activeExperiments, [testName, testConfig]) =>
            switches[testName]
                ? { ...activeExperiments, [testName]: testConfig }
                : activeExperiments,
        {} as StyledExperimentCollection,
    );
};

const getVariantCSS = (
    styleVariants: { [variantName: string]: string },
    experimentName: string,
) =>
    Object.entries(styleVariants).reduce(
        (variantStyleString, [variantName, variantStyle]) =>
            `${variantStyleString} body[amp-x-${experimentName}='${variantName}'] ${variantStyle}`.trim(),
        '',
    );

export const buildExperimentStyle = (experiments: StylesCollection): string => {
    return Object.entries(experiments).reduce(
        (experimentStyleString, [experimentName, styleVariants]) => {
            const experimentStyle = getVariantCSS(
                styleVariants,
                experimentName,
            );
            return `${experimentStyleString} ${experimentStyle}`.trim();
        },
        '',
    );
};

export const getAllActiveExperiments = (
    experimentFullConfig: StyledExperimentCollection,
    switches: { [key: string]: boolean },
): AmpExperimentCollection =>
    extractExperimentModels(
        filterActiveExperiments(experimentFullConfig, switches),
    );

export const getAllActiveCss = (
    experimentFullConfig: StyledExperimentCollection,
    switches: { [key: string]: boolean },
) =>
    buildExperimentStyle(
        extractStylesFromExperiments(
            filterActiveExperiments(experimentFullConfig, switches),
        ),
    );
