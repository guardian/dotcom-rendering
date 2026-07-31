import type { AbTest } from '@guardian/ophan-tracker-js';

export const NEWSLETTER_PREVIEW_AB_TEST_NAME =
	'newsletters-in-article-signup-preview';

export const NEWSLETTER_PREVIEW_VARIANT = {
	illustrated: 'illustrated',
	withoutPreview: 'without-preview',
} as const;

export type NewsletterPreviewVariant =
	(typeof NEWSLETTER_PREVIEW_VARIANT)[keyof typeof NEWSLETTER_PREVIEW_VARIANT];

export const isNewsletterPreviewVariant = (
	variant: string | undefined,
): variant is NewsletterPreviewVariant =>
	variant === NEWSLETTER_PREVIEW_VARIANT.illustrated ||
	variant === NEWSLETTER_PREVIEW_VARIANT.withoutPreview;

export const isWithoutPreviewVariant = (variant: string | undefined): boolean =>
	variant === NEWSLETTER_PREVIEW_VARIANT.withoutPreview;

export const resolveNewsletterPreviewAbTest = (
	variant: string | undefined,
): AbTest | undefined => {
	if (!isNewsletterPreviewVariant(variant)) {
		return;
	}

	return {
		name: NEWSLETTER_PREVIEW_AB_TEST_NAME,
		variant,
	};
};
