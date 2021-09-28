import { ArticleDisplay, ArticleDesign } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';

import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import { decideDesign } from '@root/src/web/lib/decideDesign';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';
import { CommentLayout } from './CommentLayout';
import { ImmersiveLayout } from './ImmersiveLayout';
import { LiveLayout } from './LiveLayout';
import { InteractiveImmersiveLayout } from './InteractiveImmersiveLayout';
import { InteractiveLayout } from './InteractiveLayout';

type Props = {
	CAPI: CAPIType;
	NAV: NavType;
};

export const DecideLayout = ({ CAPI, NAV }: Props): JSX.Element => {
	const display: ArticleDisplay = decideDisplay(CAPI.format);
	const design: ArticleDesign = decideDesign(CAPI.format);
	const theme: ArticlePillar = decideTheme(CAPI.format);
	const format: ArticleFormat = {
		display,
		design,
		theme,
	};
	const palette = decidePalette(format);

	// TODO we can probably better express this as data
	switch (display) {
		case ArticleDisplay.Immersive: {
			if (design === ArticleDesign.Interactive) {
				return (
					<InteractiveImmersiveLayout
						CAPI={CAPI}
						NAV={NAV}
						format={format}
						palette={palette}
					/>
				);
			}

			return (
				<ImmersiveLayout
					CAPI={CAPI}
					NAV={NAV}
					palette={palette}
					format={format}
				/>
			);
		}
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Showcase: {
			switch (design) {
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
			switch (design) {
				case ArticleDesign.Interactive:
					return (
						<InteractiveLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
							palette={palette}
						/>
					);
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
