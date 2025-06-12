import type { TAction } from '@guardian/ophan-tracker-js';
import type { GutterProps } from '@guardian/support-dotcom-components/dist/shared/types/props/gutter';
import { useCallback, useEffect } from 'react';
import { useIsInView } from '../../../lib/useIsInView';
import type { ReactComponent } from '../lib/ReactComponent';
import {
	createClickEventFromTracking,
	enrichSupportUrl,
} from '../lib/tracking';
import { GutterAsk } from './GutterAsk';

export const GutterAskWrapper: ReactComponent<GutterProps> = (
	props: GutterProps,
) => {
	const { content, tracking, submitComponentEvent } = props;
	const { abTestName, abTestVariant, componentType, campaignCode } = tracking;
	const baseUrl = content.cta
		? content.cta.baseUrl
		: 'https://support.theguardian.com/contribute';

	const enrichedUrl = enrichSupportUrl({
		baseUrl,
		tracking: props.tracking,
		promoCodes: props.promoCodes ?? [],
		countryCode: props.countryCode,
	});

	const onCtaClick = (componentId: string) => {
		return (): void => {
			const componentClickEvent = createClickEventFromTracking(
				tracking,
				`${componentId} : cta`,
			);
			if (submitComponentEvent) {
				void submitComponentEvent(componentClickEvent);
			}
		};
	};

	const sendOphanEvent = useCallback(
		(action: TAction): void => {
			if (submitComponentEvent) {
				void submitComponentEvent({
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
