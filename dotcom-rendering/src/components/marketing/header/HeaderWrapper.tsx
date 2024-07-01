/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/4925ef1e0ced5d221f1122afe79f93bd7448e0e5/packages/modules/src/modules/headers/HeaderWrapper.tsx
 */
import type { OphanAction } from '@guardian/libs';
import { headerPropsSchema } from '@guardian/support-dotcom-components';
import type {
	Cta,
	HeaderProps,
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useCallback, useEffect } from 'react';
import { useIsInView } from '../../../lib/useIsInView';
import type { ReactComponent } from '../lib/ReactComponent';
import {
	addRegionIdAndTrackingParamsToSupportUrl,
	addTrackingParamsToProfileUrl,
	createClickEventFromTracking,
	isProfileUrl,
} from '../lib/tracking';
import { withParsedProps } from '../shared/ModuleWrapper';

export interface HeaderEnrichedCta {
	ctaUrl: string;
	ctaText: string;
}

export interface HeaderRenderedContent {
	heading: string;
	subheading: string;
	primaryCta: HeaderEnrichedCta | null;
	secondaryCta: HeaderEnrichedCta | null;
}

export interface HeaderRenderProps {
	content: HeaderRenderedContent;
	mobileContent?: HeaderRenderedContent;
	onCtaClick?: () => void; // only used by sign in prompt header
}

export const headerWrapper = (
	Header: ReactComponent<HeaderRenderProps>,
): ReactComponent<HeaderProps> => {
	const Wrapped: ReactComponent<HeaderProps> = ({
		content,
		mobileContent,
		tracking,
		countryCode,
		submitComponentEvent,
		numArticles,
	}) => {
		const buildEnrichedCta = (cta: Cta): HeaderEnrichedCta => {
			if (isProfileUrl(cta.baseUrl)) {
				return {
					ctaUrl: addTrackingParamsToProfileUrl(
						cta.baseUrl,
						tracking,
					),
					ctaText: cta.text,
				};
			}
			return {
				ctaUrl: addRegionIdAndTrackingParamsToSupportUrl(
					cta.baseUrl,
					tracking,
					numArticles,
					countryCode,
				),
				ctaText: cta.text,
			};
		};

		const primaryCta = content.primaryCta
			? buildEnrichedCta(content.primaryCta)
			: null;
		const secondaryCta = content.secondaryCta
			? buildEnrichedCta(content.secondaryCta)
			: null;

		const renderedContent: HeaderRenderedContent = {
			heading: content.heading,
			subheading: content.subheading,
			primaryCta,
			secondaryCta,
		};

		const mobilePrimaryCta = mobileContent?.primaryCta
			? buildEnrichedCta(mobileContent.primaryCta)
			: primaryCta;

		const mobileSecondaryCta = mobileContent?.secondaryCta
			? buildEnrichedCta(mobileContent.secondaryCta)
			: secondaryCta;

		const renderedMobileContent = mobileContent
			? ({
					heading: mobileContent.heading,
					subheading: mobileContent.subheading,
					primaryCta: mobilePrimaryCta,
					secondaryCta: mobileSecondaryCta,
			  } as HeaderRenderedContent)
			: undefined;

		const { abTestName, abTestVariant, componentType, campaignCode } =
			tracking;

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
				<Header
					content={renderedContent}
					mobileContent={renderedMobileContent}
					onCtaClick={onCtaClick(campaignCode)}
				/>
			</div>
		);
	};
	return Wrapped;
};

const validate = (props: unknown): props is HeaderProps => {
	const result = headerPropsSchema.safeParse(props);
	return result.success;
};

export const validatedHeaderWrapper = (
	Header: ReactComponent<HeaderRenderProps>,
): ReactComponent<HeaderProps> =>
	withParsedProps(headerWrapper(Header), validate);
