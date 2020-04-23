import {ExperimentModel} from "@root/src/amp/components/Experiment";


export const getActiveTests = (abTests: ExperimentModel, switches: {[key: string]: boolean}) => {
    return Object.entries(abTests).reduce(
        (acc, [key, val]) => {
            if (switches[key]) {
                acc[key] = val;
            }
            return acc;
        },
        {} as ExperimentModel
    );
}
// Variant proportions must be >0, so we set extremely low to simulate a 0% test
const testExperiment: ExperimentModel = {
    abZeroTestExperiment: {
        sticky: true,
        consentNotificationId: 'the-adconsent-element',
        variants: {
            treatment1: 0.0000001,
        },
    },
};

export const abTests: ExperimentModel = {...testExperiment}
