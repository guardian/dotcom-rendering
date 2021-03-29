import React from 'react';

import { Display, Design } from '@guardian/types';
import type { Format } from '@guardian/types';

import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import { decideDesign } from '@root/src/web/lib/decideDesign';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';
import { CommentLayout } from './CommentLayout';
import { ImmersiveLayout } from './ImmersiveLayout';
import { LiveLayout } from './LiveLayout';

type Props = {
	CAPI: CAPIType;
	NAV: NavType;
};

export const DecideLayout = ({ CAPI, NAV }: Props): JSX.Element => {
	const display: Display = decideDisplay(CAPI);
	const design: Design = decideDesign({
		designType: CAPI.designType,
		tags: CAPI.tags,
		isLiveBlog: CAPI.config.isLiveBlog,
		isLive: CAPI.config.isLive,
	});
	const pillar: Pillar = decideTheme({
		pillar: CAPI.pillar,
		design,
		isSpecialReport: CAPI.isSpecialReport,
	});
	const format: Format = {
		display,
		design,
		theme: pillar,
	};
	const palette = decidePalette(format);

	switch (display) {
		case Display.Immersive: {
			switch (design) {
				case Design.Comment:
				case Design.Editorial:
					return (
						<ImmersiveLayout
							CAPI={CAPI}
							NAV={NAV}
							palette={palette}
							format={format}
						/>
					);
				default:
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
		case Display.Showcase: {
			switch (design) {
				case Design.LiveBlog:
				case Design.DeadBlog:
					return (
						<LiveLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
							palette={palette}
						/>
					);
				case Design.Comment:
				case Design.Editorial:
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
		case Display.Standard:
		default: {
			switch (design) {
				case Design.LiveBlog:
				case Design.DeadBlog:
					return (
						<LiveLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
							palette={palette}
						/>
					);
				case Design.Comment:
				case Design.Editorial:
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
