import { css } from '@emotion/react';
import { palette as sourcePalette, space } from '@guardian/source/foundations';
import { useCallback, useState } from 'react';
import { buildNewsletterPreviewUrl } from '../lib/newsletterPreviewUrl';
import {
	NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT,
	sendNewsletterSignupEvent,
} from '../lib/newsletterSignupTracking';
import type { RenderingTarget } from '../types/renderingTarget';
import { NewsletterHighlightsCard } from './NewsletterHighlightsCard';
import type { NewsletterPreviewAction } from './NewsletterPreviewButton';
import { NewsletterPreviewModal } from './NewsletterPreviewModal';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import type { NewsletterSignupCardProps } from './NewsletterSignupCard';
import { NewsletterSignupCard } from './NewsletterSignupCard';

type PreviewEventDescription = 'preview-open' | 'preview-close';

const sendPreviewTracking = ({
	identityName,
	eventDescription,
	renderingTarget,
	renderUrl,
	isSignedIn,
	isHighlights,
}: {
	identityName: string;
	eventDescription: PreviewEventDescription;
	renderingTarget: RenderingTarget;
	renderUrl: string;
	isSignedIn?: boolean | 'Pending';
	isHighlights?: boolean;
}) => {
	const componentIds = isHighlights
		? NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT.highlights
		: NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT.inArticle;

	sendNewsletterSignupEvent({
		action: eventDescription === 'preview-open' ? 'EXPAND' : 'CLOSE',
		identityName,
		componentId: componentIds.variant(identityName),
		renderingTarget,
		value: { eventDescription, renderUrl, isSignedIn },
	});
};

type Props = Pick<
	NewsletterSignupCardProps,
	'name' | 'frequency' | 'description' | 'illustrationSquare'
> & {
	highlightCardTitle?: string;
	identityName: string;
	category?: string;
	exampleUrl?: string;
	renderingTarget: RenderingTarget;
	theme: string;
	isSignedIn?: boolean | 'Pending';
	children?: (
		previewAction: NewsletterPreviewAction | undefined,
	) => React.ReactNode;
};

const themeColorStyles = (theme: string) => css`
	--newsletter-signup-title-color: ${theme === 'news'
		? sourcePalette.sport[400]
		: 'inherit'};
`;

export const NewsletterSignupCardContainer = ({
	identityName,
	category,
	exampleUrl,
	renderingTarget,
	theme,
	name,
	highlightCardTitle,
	frequency,
	description,
	illustrationSquare,
	children,
	isSignedIn,
}: Props) => {
	const showPrivacyMessageOutside = isSignedIn === true;
	const isHighlights = highlightCardTitle !== undefined;
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	const renderUrl = buildNewsletterPreviewUrl({
		exampleUrl,
		category,
	});
	const hasPreviewUrl = typeof renderUrl === 'string' && renderUrl.length > 0;

	const openPreview = useCallback(() => {
		if (!hasPreviewUrl) {
			return;
		}

		setIsPreviewOpen((isOpen) => {
			if (!isOpen) {
				sendPreviewTracking({
					identityName,
					eventDescription: 'preview-open',
					renderingTarget,
					renderUrl,
					isSignedIn,
					isHighlights,
				});
			}

			return true;
		});
	}, [
		hasPreviewUrl,
		identityName,
		isHighlights,
		isSignedIn,
		renderingTarget,
		renderUrl,
	]);

	const trackPreviewLinkOpen = useCallback(() => {
		if (!hasPreviewUrl) {
			return;
		}

		sendPreviewTracking({
			identityName,
			eventDescription: 'preview-open',
			renderingTarget,
			renderUrl,
			isSignedIn,
			isHighlights,
		});
	}, [
		hasPreviewUrl,
		identityName,
		isHighlights,
		isSignedIn,
		renderingTarget,
		renderUrl,
	]);

	const closePreview = useCallback(() => {
		setIsPreviewOpen((isOpen) => {
			if (isOpen && hasPreviewUrl) {
				sendPreviewTracking({
					identityName,
					eventDescription: 'preview-close',
					renderingTarget,
					renderUrl,
					isSignedIn,
					isHighlights,
				});
			}

			return false;
		});
	}, [
		hasPreviewUrl,
		identityName,
		isHighlights,
		isSignedIn,
		renderingTarget,
		renderUrl,
	]);

	const previewAction = hasPreviewUrl
		? renderingTarget === 'Apps'
			? {
					behaviour: 'link' as const,
					href: renderUrl,
					onClick: trackPreviewLinkOpen,
			  }
			: {
					behaviour: 'modal' as const,
					onClick: openPreview,
			  }
		: undefined;

	const cardClickHandler = isHighlights
		? () => undefined
		: previewAction?.behaviour === 'modal'
		? previewAction.onClick
		: () => undefined;

	return (
		<div css={themeColorStyles(theme)}>
			{isPreviewOpen && hasPreviewUrl && (
				<NewsletterPreviewModal
					newsletterName={name}
					renderUrl={renderUrl}
					onClose={closePreview}
				/>
			)}
			<div
				css={css`
					margin-bottom: ${space[6]}px;
				`}
			>
				{highlightCardTitle !== undefined ? (
					<NewsletterHighlightsCard
						highlightCardTitle={highlightCardTitle}
						illustrationSquare={illustrationSquare}
						onClick={cardClickHandler}
					/>
				) : (
					<NewsletterSignupCard
						name={name}
						frequency={frequency}
						description={description}
						illustrationSquare={illustrationSquare}
						previewAction={previewAction}
						isSignedIn={isSignedIn}
					>
						{children?.(previewAction)}
					</NewsletterSignupCard>
				)}
				{showPrivacyMessageOutside && (
					<NewsletterPrivacyMessage
						textColor="regular"
						cssOverrides={css`
							display: block;
							margin-top: ${space[2]}px;
						`}
					/>
				)}
			</div>
		</div>
	);
};
