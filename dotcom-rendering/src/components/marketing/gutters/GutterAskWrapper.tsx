/* eslint-disable import/order */
import { useCallback, useEffect } from 'react';
import { GutterAsk } from './GutterAsk';
import { useIsInView } from '../../../lib/useIsInView';
import type { OphanAction } from '@guardian/libs';
import {
	addRegionIdAndTrackingParamsToSupportUrl,
	createClickEventFromTracking,
} from '../lib/tracking';
import type { GutterProps } from '@guardian/support-dotcom-components/dist/shared/types/props/gutter';
import type { ReactComponent } from '../lib/ReactComponent';

export const GutterAskWrapper: ReactComponent<GutterProps> = (
	props: GutterProps,
) => {
	const { content, tracking, submitComponentEvent } = props;
	const { abTestName, abTestVariant, componentType, campaignCode } = tracking;
	const baseUrl = content.cta
		? content.cta.baseUrl
		: 'https://support.theguardian.com/contribute';

	const enrichedUrl = addRegionIdAndTrackingParamsToSupportUrl(
		baseUrl,
		props.tracking,
		undefined,
		props.countryCode,
	);

	const onCtaClick = (componentId: string) => {
		return (): void => {
			const componentClickEvent = createClickEventFromTracking(
				tracking,
				`${componentId} : cta`,
			);
			if (submitComponentEvent) {
				submitComponentEvent(componentClickEvent);
			}
		};
	};

	const sendOphanEvent = useCallback(
		(action: OphanAction): void => {
			if (submitComponentEvent) {
				submitComponentEvent({
					component: {
						componentType,
						id: campaignCode,
						campaignCode,
					},
					action,
					abTest: {
						name: abTestName,
						variant: abTestVariant,
					},
				});
			}
		},
		[
			abTestName,
			abTestVariant,
			campaignCode,
			componentType,
			submitComponentEvent,
		],
	);

	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});

	useEffect(() => {
		if (hasBeenSeen) {
			sendOphanEvent('VIEW');
		}
	}, [hasBeenSeen, sendOphanEvent]);

	useEffect(() => {
		sendOphanEvent('INSERT');
	}, [sendOphanEvent]);

	return (
		<div ref={setNode}>
			<GutterAsk
				variant={content}
				enrichedUrl={enrichedUrl}
				onCtaClick={onCtaClick(campaignCode)}
			/>
		</div>
	);
};
