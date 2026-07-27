import { css } from '@emotion/react';
import type { AbTest } from '@guardian/ophan-tracker-js';
import { palette as sourcePalette, space } from '@guardian/source/foundations';
import { useCallback, useState } from 'react';
import { buildNewsletterPreviewUrl } from '../lib/newsletterPreviewUrl';
import {
	NEWSLETTER_SIGNUP_COMPONENT_ID,
	sendNewsletterSignupEvent,
} from '../lib/newsletterSignupTracking';
import type { RenderingTarget } from '../types/renderingTarget';
import type { NewsletterPreviewAction } from './NewsletterPreviewButton';
import { NewsletterPreviewModal } from './NewsletterPreviewModal';
import type { NewsletterSignupCardProps } from './NewsletterSignupCard';
import { NewsletterSignupCard } from './NewsletterSignupCard';

type PreviewEventDescription = 'preview-open' | 'preview-close';

const sendPreviewTracking = ({
	identityName,
	eventDescription,
	renderingTarget,
	renderUrl,
	isSignedIn,
	abTest,
}: {
	identityName: string;
	eventDescription: PreviewEventDescription;
	renderingTarget: RenderingTarget;
	renderUrl: string;
	isSignedIn?: boolean | 'Pending';
	abTest?: AbTest;
}) => {
	sendNewsletterSignupEvent({
		action: eventDescription === 'preview-open' ? 'EXPAND' : 'CLOSE',
		identityName,
		componentId:
			NEWSLETTER_SIGNUP_COMPONENT_ID.inArticleSignupForm(identityName),
		renderingTarget,
		value: { eventDescription, renderUrl, isSignedIn },
		abTest,
	});
};

type Props = Pick<
	NewsletterSignupCardProps,
	'name' | 'frequency' | 'description' | 'illustrationSquare'
> & {
	identityName: string;
	category?: string;
	exampleUrl?: string;
	renderingTarget: RenderingTarget;
	theme: string;
	isSignedIn?: boolean | 'Pending';
	abTest?: AbTest;
	enablePreview?: boolean;
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
	frequency,
	description,
	illustrationSquare,
	children,
	isSignedIn,
	abTest,
	enablePreview = true,
}: Props) => {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	const renderUrl = buildNewsletterPreviewUrl({
		exampleUrl,
		category,
	});
	const hasPreviewUrl = enablePreview && Boolean(renderUrl);

	const openPreview = useCallback(() => {
		if (renderUrl === undefined || renderUrl === '') {
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
					abTest,
				});
			}

			return true;
		});
	}, [abTest, identityName, isSignedIn, renderingTarget, renderUrl]);

	const trackPreviewLinkOpen = useCallback(() => {
		if (renderUrl === undefined || renderUrl === '') {
			return;
		}

		sendPreviewTracking({
			identityName,
			eventDescription: 'preview-open',
			renderingTarget,
			renderUrl,
			isSignedIn,
			abTest,
		});
	}, [abTest, identityName, isSignedIn, renderingTarget, renderUrl]);

	const closePreview = useCallback(() => {
		setIsPreviewOpen((isOpen) => {
			if (isOpen && renderUrl !== undefined && renderUrl !== '') {
				sendPreviewTracking({
					identityName,
					eventDescription: 'preview-close',
					renderingTarget,
					renderUrl,
					isSignedIn,
					abTest,
				});
			}

			return false;
		});
	}, [abTest, identityName, isSignedIn, renderingTarget, renderUrl]);

	const previewAction = hasPreviewUrl
		? renderingTarget === 'Apps'
			? {
					behaviour: 'link' as const,
					href: renderUrl ?? '',
					onClick: trackPreviewLinkOpen,
				}
			: {
					behaviour: 'modal' as const,
					onClick: openPreview,
				}
		: undefined;

	return (
		<div css={themeColorStyles(theme)}>
			{enablePreview && isPreviewOpen && hasPreviewUrl && (
				<NewsletterPreviewModal
					newsletterName={name}
					renderUrl={renderUrl ?? ''}
					onClose={closePreview}
				/>
			)}
			<div
				css={css`
					margin-bottom: ${space[6]}px;
				`}
			>
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
			</div>
		</div>
	);
};
