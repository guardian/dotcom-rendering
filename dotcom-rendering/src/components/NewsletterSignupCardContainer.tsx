import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';
import { useCallback, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { buildNewsletterPreviewUrl } from '../lib/newsletterPreviewUrl';
import type { RenderingTarget } from '../types/renderingTarget';
import { NewsletterPreviewModal } from './NewsletterPreviewModal';
import type { NewsletterSignupCardProps } from './NewsletterSignupCard';
import { NewsletterSignupCard } from './NewsletterSignupCard';

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
	children?: (openPreview: (() => void) | undefined) => React.ReactNode;
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
}: Props) => {
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

	return (
		<div css={themeColorStyles(theme)}>
			{isPreviewOpen && hasPreviewUrl && (
				<NewsletterPreviewModal
					newsletterName={name}
					renderUrl={renderUrl ?? ''}
					onClose={closePreview}
				/>
			)}
			<NewsletterSignupCard
				name={name}
				frequency={frequency}
				description={description}
				illustrationSquare={illustrationSquare}
			>
				{children?.(hasPreviewUrl ? openPreview : undefined)}
			</NewsletterSignupCard>
		</div>
	);
};
