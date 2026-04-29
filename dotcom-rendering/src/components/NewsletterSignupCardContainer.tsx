import { css } from '@emotion/react';
import { palette as sourcePalette, space } from '@guardian/source/foundations';
import { useCallback, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { buildNewsletterPreviewUrl } from '../lib/newsletterPreviewUrl';
import type { RenderingTarget } from '../types/renderingTarget';
import { NewsletterPreviewModal } from './NewsletterPreviewModal';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import type { NewsletterSignupCardProps } from './NewsletterSignupCard';
import { NewsletterSignupCard } from './NewsletterSignupCard';

export type NewsletterPreviewAction =
	| {
			behaviour: 'modal';
			onClick: () => void;
	  }
	| {
			behaviour: 'link';
			href: string;
			onClick: () => void;
	  };

type PreviewEventDescription = 'preview-open' | 'preview-close';

const sendPreviewTracking = ({
	identityName,
	eventDescription,
	renderingTarget,
	renderUrl,
}: {
	identityName: string;
	eventDescription: PreviewEventDescription;
	renderingTarget: RenderingTarget;
	renderUrl: string;
}) => {
	const action = eventDescription === 'preview-open' ? 'EXPAND' : 'CLOSE';

	const value = JSON.stringify({
		eventDescription,
		newsletterId: identityName,
		renderUrl,
		timestamp: Date.now(),
	});

	void submitComponentEvent(
		{
			action,
			value,
			component: {
				componentType: 'NEWSLETTER_SUBSCRIPTION',
				id: `DCR NewsletterPreview ${identityName}`,
			},
		},
		renderingTarget,
	);
};

type Props = Omit<NewsletterSignupCardProps, 'children'> & {
	identityName: string;
	category?: string;
	exampleUrl?: string;
	renderingTarget: RenderingTarget;
	theme: string;
	/**
	 * Pass the signed-in status so the container can render the privacy message
	 * below the card (rather than inside the form) when the user is signed in.
	 */
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
	frequency,
	description,
	illustrationSquare,
	children,
	isSignedIn,
}: Props) => {
	const showPrivacyMessageOutside = isSignedIn === true;
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	const renderUrl = buildNewsletterPreviewUrl({
		exampleUrl,
		category,
	});
	const hasPreviewUrl = Boolean(renderUrl);

	const openPreview = useCallback(() => {
		if (!renderUrl) return;

		setIsPreviewOpen((isOpen) => {
			if (!isOpen) {
				sendPreviewTracking({
					identityName,
					eventDescription: 'preview-open',
					renderingTarget,
					renderUrl,
				});
			}

			return true;
		});
	}, [identityName, renderingTarget, renderUrl]);

	const trackPreviewLinkOpen = useCallback(() => {
		if (!renderUrl) return;

		sendPreviewTracking({
			identityName,
			eventDescription: 'preview-open',
			renderingTarget,
			renderUrl,
		});
	}, [identityName, renderingTarget, renderUrl]);

	const closePreview = useCallback(() => {
		setIsPreviewOpen((isOpen) => {
			if (isOpen && renderUrl) {
				sendPreviewTracking({
					identityName,
					eventDescription: 'preview-close',
					renderingTarget,
					renderUrl,
				});
			}

			return false;
		});
	}, [identityName, renderingTarget, renderUrl]);

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
			{isPreviewOpen && hasPreviewUrl && (
				<NewsletterPreviewModal
					newsletterName={name}
					renderUrl={renderUrl ?? ''}
					onClose={closePreview}
				/>
			)}
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: ${space[2]}px;
					margin-bottom: ${space[6]}px;
				`}
			>
				<NewsletterSignupCard
					name={name}
					frequency={frequency}
					description={description}
					illustrationSquare={illustrationSquare}
				>
					{children?.(previewAction)}
				</NewsletterSignupCard>
				{showPrivacyMessageOutside && (
					<NewsletterPrivacyMessage textColor="regular" />
				)}
			</div>
		</div>
	);
};
