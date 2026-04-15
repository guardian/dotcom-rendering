import { css, Global } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { Button } from '@guardian/source/react-components';
import { useCallback, useEffect, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { buildNewsletterPreviewUrl } from '../lib/newsletterPreviewUrl';
import type { RenderingTarget } from '../types/renderingTarget';
import { NewsletterPreviewModal } from './NewsletterPreviewModal';
import {
	NewsletterSignupCard,
	type NewsletterSignupCardProps,
} from './NewsletterSignupCard';

const NEWSLETTER_ILLUSTRATION_PLACEHOLDER =
	'https://placehold.co/240x180?text=Newsletter';

const previewButtonStyles = css`
	margin-bottom: ${space[2]}px;
`;

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

type Props = Omit<NewsletterSignupCardProps, 'illustration'> & {
	identityName: string;
	category?: string;
	exampleUrl?: string;
	renderingTarget: RenderingTarget;
	theme: string;
	children?: React.ReactNode;
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

	useEffect(() => {
		if (!isPreviewOpen) return;

		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closePreview();
			}
		};

		document.documentElement.classList.add('newsletter-preview-open');
		document.addEventListener('keydown', closeOnEscape);

		return () => {
			document.documentElement.classList.remove(
				'newsletter-preview-open',
			);
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, [closePreview, isPreviewOpen]);

	return (
		<div css={themeColorStyles(theme)}>
			{isPreviewOpen && hasPreviewUrl && (
				<>
					<Global
						styles={css`
							html.newsletter-preview-open,
							html.newsletter-preview-open body {
								overflow: hidden;
							}
						`}
					/>
					<NewsletterPreviewModal
						newsletterName={name}
						renderUrl={renderUrl ?? ''}
						onClose={closePreview}
					/>
				</>
			)}
			<NewsletterSignupCard
				name={name}
				frequency={frequency}
				description={description}
				illustration={NEWSLETTER_ILLUSTRATION_PLACEHOLDER}
			>
				{hasPreviewUrl && (
					<div
						css={css`
							display: flex;
							justify-content: flex-end;
							${from.tablet} {
								justify-content: flex-start;
							}
						`}
					>
						<Button
							size="small"
							priority="tertiary"
							onClick={openPreview}
							cssOverrides={previewButtonStyles}
						>
							Preview newsletter
						</Button>
					</div>
				)}
				{children}
			</NewsletterSignupCard>
		</div>
	);
};
