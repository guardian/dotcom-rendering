import { ArticleDisplay, ArticleDesign } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';

import { decidePalette } from '../lib/decidePalette';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';
import { CommentLayout } from './CommentLayout';
import { ImmersiveLayout } from './ImmersiveLayout';
import { LiveLayout } from './LiveLayout';
import { InteractiveLayout } from './InteractiveLayout';
import { FullPageInteractiveLayout } from './FullPageInteractiveLayout';
import { NewsletterSignupLayout } from './NewsletterSignupLayout';
import { hackToNewsletterSignupLayout, formatAsNewsletterDesign } from './lib/newsLetterHacks';

type Props = {
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
};

export const DecideLayout = ({ CAPI, NAV, format }: Props): JSX.Element => {
	if (hackToNewsletterSignupLayout || CAPI.tags.some(tag => tag.id === 'info/newsletter-sign-up')) {
		const newsletterFormat = formatAsNewsletterDesign(format)
		const newsletterPalette = decidePalette(newsletterFormat);

		return (
			<NewsletterSignupLayout
				CAPI={CAPI}
				NAV={NAV}
				format={newsletterFormat}
				palette={newsletterPalette}
			/>
		);
	}

	const palette = decidePalette(format);

	// TODO we can probably better express this as data
	switch (format.display) {
		case ArticleDisplay.Immersive: {
			switch (format.design) {
				case ArticleDesign.Interactive: {
					// Render all 'immersive interactives' until switchover date as 'FullPageInteractive'
					// TBD: After 'immersive interactive' changes to CAPI are merged, add logic here to either use
					// 'InteractiveImmersiveLayout' if published after switchover date, or 'FullPageInteractiveLayout'
					// if published before.
					return (
						<FullPageInteractiveLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
						/>
					);
				}
				default: {
					return (
						<ImmersiveLayout
							CAPI={CAPI}
							NAV={NAV}
							palette={palette}
							format={format}
						/>
					);
				}
			}
		}
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Showcase: {
			switch (format.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
							palette={palette}
						/>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<CommentLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
							palette={palette}
						/>
					);
				default:
					return (
						<ShowcaseLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
							palette={palette}
						/>
					);
			}
		}
		case ArticleDisplay.Standard:
		default: {
			switch (format.design) {
				case ArticleDesign.Interactive:
					return (
						<InteractiveLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
							palette={palette}
						/>
					);
				case ArticleDesign.FullPageInteractive: {
					return (
						<FullPageInteractiveLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
						/>
					);
				}
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
							palette={palette}
						/>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<CommentLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
							palette={palette}
						/>
					);
				default:
					return (
						<StandardLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
							palette={palette}
						/>
					);
			}
		}
	}
};
