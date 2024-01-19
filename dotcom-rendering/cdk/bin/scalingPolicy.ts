import type { ScalingInterval } from 'aws-cdk-lib/aws-applicationautoscaling';
import { AdjustmentType } from 'aws-cdk-lib/aws-applicationautoscaling';

export interface ScalingPolicies {
	policies: {
		scaleOut: {
			scalingSteps: ScalingInterval[];
			adjustmentType: AdjustmentType;
		};
		scaleIn: {
			scalingSteps: ScalingInterval[];
			adjustmentType: AdjustmentType;
		};
	};
}

/** Scaling policies ASCII diagram
 *
 * Metric value (latency in seconds)
 *  0         0.15         0.2         0.3         infinity
 * --------------------------------------------------------
 *  |   - 1    |     0      |   + 50%   |     + 80%      |
 * --------------------------------------------------------
 * Instance change
 *
 * -
 * When scaling up, we use percentage change (+50% initially then +80% if particularly high)
 * When scaling down, we use absolute change (-1 each interval)
 * We take no scaling actions when latency is between 0.15s and 0.2s to avoid flapping
 * @see https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html#step-scaling-considerations
 */
export const baseScalingPolicies: ScalingPolicies['policies'] = {
	scaleOut: {
		adjustmentType: AdjustmentType.PERCENT_CHANGE_IN_CAPACITY,
		scalingSteps: [
			{
				// No scaling up effect between 0 and 0.2s latency
				change: 0,
				lower: 0,
				upper: 0.2,
			},
			{
				// When latency is higher than 0.2s we scale up by 50%
				change: 50,
				lower: 0.2,
			},
			{
				// When latency is higher than 0.3s we scale up by 80%
				change: 80,
				lower: 0.3,
			},
		],
	},
	scaleIn: {
		scalingSteps: [
			{
				// No scaling down effect when latency is higher than 0.15s
				change: 0,
				lower: 0.15,
			},
			{
				// When latency is lower than 0.15s we scale down by 1
				change: -1,
				upper: 0.15,
				lower: 0,
			},
		],
		adjustmentType: AdjustmentType.CHANGE_IN_CAPACITY,
	},
};
