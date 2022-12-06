import { css } from '@emotion/react';
import type { BrazeEndOfArticleComponent } from '@guardian/braze-components/end-of-article';
import type {
	BrazeArticleContext,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import { useEffect, useRef, useState } from 'react';
import { submitComponentEvent } from '../../browser/ophan/ophan';
import { getBrazeMetaFromUrlFragment } from '../../lib/braze/forceBrazeMessage';
import type { CanShowResult } from '../../lib/messagePicker';
import { useIsInView } from '../../lib/useIsInView';
import { useOnce } from '../../lib/useOnce';

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

	try {
		const message = await brazeMessages.getMessageForEndOfArticle(
			brazeArticleContext,
		);

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
	const [hasBeenSeen, setNode] = useIsInView({
		rootMargin: '-18px',
		threshold: 0,
		debounce: true,
	});

	const epicRef = useRef(null);

	useOnce(() => {
		submitComponentEvent({
			component: {
				componentType: COMPONENT_TYPE,
				id: meta.dataFromBraze.ophanComponentId,
			},
			action: 'INSERT',
		});
	}, [meta.dataFromBraze, epicRef.current]);

	useEffect(() => {
		if (hasBeenSeen) {
			meta.logImpressionWithBraze();

			// Log VIEW event with Ophan
			submitComponentEvent({
				component: {
					componentType: COMPONENT_TYPE,
					id: meta.dataFromBraze.ophanComponentId,
				},
				action: 'VIEW',
			});
		}
	}, [hasBeenSeen, meta]);

	return (
		<div ref={setNode} css={wrapperMargins}>
			<div ref={epicRef}>
				<BrazeComponent
					componentName={meta.dataFromBraze.componentName}
					brazeMessageProps={meta.dataFromBraze}
					subscribeToNewsletter={async (newsletterId) => {
						await fetch(`${idApiUrl}/users/me/newsletters`, {
							method: 'PATCH',
							body: JSON.stringify({
								id: newsletterId,
								subscribed: true,
							}),
							credentials: 'include',
						});
					}}
					countryCode={countryCode}
					logButtonClickWithBraze={meta.logButtonClickWithBraze}
					submitComponentEvent={submitComponentEvent}
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
