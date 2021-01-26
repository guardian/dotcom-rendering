import React from 'react';

import { Display, Design, Format } from '@guardian/types';

import { decidePillar } from '@root/src/web/lib/decidePillar';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';
import { decideDesignType } from '@root/src/web/lib/decideDesignType';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';
import { CommentLayout } from './CommentLayout';
import { ImmersiveLayout } from './ImmersiveLayout';

type Props = {
	CAPI: CAPIType;
	NAV: NavType;
};

export const DecideLayout = ({ CAPI, NAV }: Props) => {
	const display: Display = decideDisplay(CAPI);
	const design: Design = decideDesignType(CAPI.designType, CAPI.tags);
	const pillar: Pillar = decidePillar({
		pillar: CAPI.pillar,
		design,
	});

	const format: Format = {
		display,
		design,
		theme: pillar,
	};

	switch (display) {
		case Display.Immersive: {
			switch (design) {
				case Design.Comment:
				case Design.GuardianView:
					return (
						<ImmersiveLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
						/>
					);
				default:
					return (
						<ImmersiveLayout
							CAPI={CAPI}
							NAV={NAV}
							format={format}
						/>
					);
			}
		}
		case Display.Showcase: {
			switch (design) {
				case Design.Comment:
				case Design.GuardianView:
					return (
						<CommentLayout CAPI={CAPI} NAV={NAV} format={format} />
					);
				default:
					return (
						<ShowcaseLayout CAPI={CAPI} NAV={NAV} format={format} />
					);
			}
		}
		case Display.Standard:
		default: {
			switch (design) {
				case Design.Comment:
				case Design.GuardianView:
					return (
						<CommentLayout CAPI={CAPI} NAV={NAV} format={format} />
					);
				default:
					return (
						<StandardLayout CAPI={CAPI} NAV={NAV} format={format} />
					);
			}
		}
	}
};
