export type Metric = number;

export interface LayoutMetrics {
    gutter: Metric;
    baseline: Metric;
    column: Metric;
}

export interface Metrics {
    layout: LayoutMetrics;
}

export const metrics: Metrics = {
    layout: {
        gutter: 20,
        baseline: 12,
        column: 60,
    },
};
