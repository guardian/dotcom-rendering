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
    fullConfig: StyledModelCollection,
): AmpModelCollection => {
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
        {} as AmpModelCollection,
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
    fullConfig: StyledModelCollection,
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
    abTestObject: StyledModelCollection,
    switches: { [key: string]: boolean },
): StyledModelCollection => {
    return Object.entries(abTestObject).reduce(
        (activeExperiments, [testName, testConfig]) =>
            switches[testName]
                ? { ...activeExperiments, [testName]: testConfig }
                : activeExperiments,
        {} as StyledModelCollection,
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
    experimentFullConfig: StyledModelCollection,
    switches: { [key: string]: boolean },
): AmpModelCollection =>
    extractExperimentModels(
        filterActiveExperiments(experimentFullConfig, switches),
    );

export const getAllActiveCss = (
    experimentFullConfig: StyledModelCollection,
    switches: { [key: string]: boolean },
) =>
    buildExperimentStyle(
        extractStylesFromExperiments(
            filterActiveExperiments(experimentFullConfig, switches),
        ),
    );
