import { css } from '@emotion/react';
import type { BrazeEndOfArticleComponent } from '@guardian/braze-components/end-of-article';
import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import { useEffect, useRef, useState } from 'react';
import { submitComponentEvent } from '../../client/ophan/ophan';
import { getBrazeMetaFromUrlFragment } from '../../lib/braze/forceBrazeMessage';
import { suppressForTaylorReport } from '../../lib/braze/taylorReport';
import { lazyFetchEmailWithTimeout } from '../../lib/fetchEmail';
import { getOptionsHeadersWithOkta } from '../../lib/identity';
import type { CanShowResult } from '../../lib/messagePicker';
import { useAuthStatus } from '../../lib/useAuthStatus';
import { useIsInView } from '../../lib/useIsInView';
import { useOnce } from '../../lib/useOnce';
import type { TagType } from '../../types/tag';
import { useConfig } from '../ConfigContext';

const wrapperMargins = css`
	margin: 18px 0;
`;

const COMPONENT_TYPE = 'RETENTION_EPIC';

type Meta = {
	dataFromBraze: { [key: string]: string };
	logImpressionWithBraze: () => void;
	logButtonClickWithBraze: (id: number) => void;
};

type EpicConfig = {
	meta: Meta;
	countryCode: string;
	idApiUrl: string;
};

export const canShowBrazeEpic = async (
	brazeMessages: BrazeMessagesInterface,
	brazeArticleContext: BrazeArticleContext,
	contentType: string,
	tags: TagType[],
	shouldHideReaderRevenue: boolean,
): Promise<CanShowResult<Meta>> => {
	if (contentType.toLowerCase() === 'interactive') {
		return { show: false };
	}

	const forcedBrazeMeta = getBrazeMetaFromUrlFragment();
	if (forcedBrazeMeta) {
		return {
			show: true,
			meta: forcedBrazeMeta,
		};
	}

	if (shouldHideReaderRevenue) {
		return { show: false };
	}

	if (suppressForTaylorReport(tags)) {
		return { show: false };
	}

	try {
		const message =
			await brazeMessages.getMessageForEndOfArticle(brazeArticleContext);

		if (message.extras) {
			return {
				show: true,
				meta: {
					dataFromBraze: message.extras,
					logImpressionWithBraze: () => {
						message.logImpression();
					},
					logButtonClickWithBraze: (internalButtonId: number) => {
						message.logButtonClick(internalButtonId);
					},
				},
			};
		}

		return { show: false };
	} catch (e) {
		return { show: false };
	}
};

type InnerProps = {
	meta: Meta;
	countryCode: string;
	BrazeComponent: typeof BrazeEndOfArticleComponent;
	idApiUrl: string;
};

const BrazeEpicWithSatisfiedDependencies = ({
	BrazeComponent,
	meta,
	countryCode,
	idApiUrl,
}: InnerProps) => {
	const authStatus = useAuthStatus();
	const [hasBeenSeen, setNode] = useIsInView({
		rootMargin: '-18px',
		threshold: 0,
		debounce: true,
	});

	const epicRef = useRef(null);

	const { renderingTarget } = useConfig();

	useOnce(() => {
		void submitComponentEvent(
			{
				component: {
					componentType: COMPONENT_TYPE,
					id: meta.dataFromBraze.ophanComponentId,
				},
				action: 'INSERT',
			},
			renderingTarget,
		);
	}, [meta.dataFromBraze, epicRef.current]);

	useEffect(() => {
		if (hasBeenSeen) {
			meta.logImpressionWithBraze();

			// Log VIEW event with Ophan
			void submitComponentEvent(
				{
					component: {
						componentType: COMPONENT_TYPE,
						id: meta.dataFromBraze.ophanComponentId,
					},
					action: 'VIEW',
				},
				renderingTarget,
			);
		}
	}, [hasBeenSeen, meta, renderingTarget]);

	const componentName = meta.dataFromBraze.componentName;
	if (!componentName) return null;

	const subscribeToNewsletter = async (newsletterId: string) => {
		if (
			authStatus.kind == 'SignedInWithCookies' ||
			authStatus.kind == 'SignedInWithOkta'
		) {
			const options = getOptionsHeadersWithOkta(authStatus);

			await fetch(`${idApiUrl}/users/me/newsletters`, {
				method: 'PATCH',
				body: JSON.stringify({
					id: newsletterId,
					subscribed: true,
				}),
				...options,
			});
		}
	};

	const fetchEmail: () => Promise<string | null> =
		lazyFetchEmailWithTimeout(idApiUrl);

	return (
		<div ref={setNode} css={wrapperMargins}>
			<div ref={epicRef}>
				<BrazeComponent
					componentName={componentName}
					brazeMessageProps={meta.dataFromBraze}
					subscribeToNewsletter={subscribeToNewsletter}
					countryCode={countryCode}
					logButtonClickWithBraze={meta.logButtonClickWithBraze}
					submitComponentEvent={(event) =>
						void submitComponentEvent(event, renderingTarget)
					}
					fetchEmail={fetchEmail}
				/>
			</div>
		</div>
	);
};

export const MaybeBrazeEpic = ({ meta, countryCode, idApiUrl }: EpicConfig) => {
	const [BrazeComponent, setBrazeComponent] =
		useState<typeof BrazeEndOfArticleComponent>();

	useEffect(() => {
		import(
			/* webpackChunkName: "guardian-braze-components-end-of-article" */ '@guardian/braze-components/end-of-article'
		)
			.then((module) => {
				setBrazeComponent(() => module.BrazeEndOfArticleComponent);
			})
			.catch((error) =>
				window.guardian.modules.sentry.reportError(error, 'braze-epic'),
			);
	}, []);

	return (
		<>
			{BrazeComponent ? (
				<BrazeEpicWithSatisfiedDependencies
					BrazeComponent={BrazeComponent}
					meta={meta}
					countryCode={countryCode}
					idApiUrl={idApiUrl}
				/>
			) : (
				<div />
			)}
		</>
	);
};
