import {
    ExperimentFullConfig
} from "@root/src/amp/components/Experiment";

// Variant proportions must be >0, so we set extremely low to simulate a 0% test
export const abTestsFullConfig: ExperimentFullConfig = {
    "ab-zero-test-experiment": {
        sticky: false,
        variants: {
            treatment1: {
                proportion: 0.0000001,
                style: `.test-header { background-color: yellow;}`
            }
        },
    },
};
