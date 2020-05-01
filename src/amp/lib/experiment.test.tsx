import {
    StyledModelCollection,
    filterActiveExperiments,
    extractExperimentModels,
    extractStylesFromExperiments,
    buildExperimentStyle,
} from '@root/src/amp/lib/experiment';

describe('Experiment Component', () => {
    const commercialConfig = {
        switches: {
            experiment1: true,
            experiment2: false,
        },
    };

    const testFullConfig: StyledModelCollection = {
        experiment1: {
            sticky: false,
            variants: {
                treatment1: {
                    proportion: 1,
                    style: `.test-header { background-color: yellow;}`,
                },
                treatment2: {
                    proportion: 99,
                    style: `.test-header { background-color: purple;}`,
                },
            },
        },
        experiment2: {
            sticky: false,
            variants: {
                treatment1: {
                    proportion: 50,
                    style: `.test-header { background-color: red;}`,
                },
            },
        },
        experiment3: {
            sticky: false,
            variants: {
                treatment1: {
                    proportion: 60,
                    style: `.test-header { background-color: blue;}`,
                },
            },
        },
    };

    it('gets the correct active tests based on the switches', () => {
        const activeExperiments = filterActiveExperiments(
            testFullConfig,
            commercialConfig.switches,
        );
        expect(Object.keys(activeExperiments).length).toBe(1);
        expect(Object.keys(activeExperiments)).toEqual(['experiment1']);
    });

    it('extracts the correct ExperimentModel from the FullConfig', () => {
        const testConfig = { experiment1: testFullConfig.experiment1 };
        expect(extractExperimentModels(testConfig)).toMatchObject({
            experiment1: {
                sticky: false,
                variants: {
                    treatment1: 1,
                    treatment2: 99,
                },
            },
        });
    });
    it('extracts the correct ExperimentStyle from the FullConfig', () => {
        const testConfig = { experiment1: testFullConfig.experiment1 };
        const testStyle = extractStylesFromExperiments(testConfig);
        expect(testStyle).toMatchObject({
            experiment1: {
                treatment1: `.test-header { background-color: yellow;}`,
                treatment2: `.test-header { background-color: purple;}`,
            },
        });
    });

    it('builds the correct variant style strings', () => {
        const testStyles = {
            experiment1: {
                treatment1: `string1`,
                treatment2: `string2`,
            },
            experiment2: {
                treatment1: `string3`,
                treatment2: `string4`,
            },
        };

        const validStyleString =
            "body[amp-x-experiment1='treatment1'] string1 body[amp-x-experiment1='treatment2'] string2 body[amp-x-experiment2='treatment1'] string3 body[amp-x-experiment2='treatment2'] string4";

        expect(buildExperimentStyle(testStyles)).toBe(validStyleString);
    });
});
