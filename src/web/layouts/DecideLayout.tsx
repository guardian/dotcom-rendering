import React from 'react';

import { decidePillar } from '@root/src/web/lib/decidePillar';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';
import { Display } from '@guardian/types/Format';
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
	const design: Design = decideDesignType(CAPI.designType);
	const pillar: CAPIPillar = decidePillar({
		pillar: CAPI.pillar,
		design,
	});

	switch (display) {
		case Display.Immersive: {
			switch (design) {
				case 'Comment':
				case 'GuardianView':
					return (
						<ImmersiveLayout
							CAPI={CAPI}
							NAV={NAV}
							display={Display.Immersive}
							design={design}
							pillar={pillar}
						/>
					);
				case 'Feature':
				case 'Review':
				case 'Interview':
				case 'Live':
				case 'Media':
				case 'PhotoEssay':
				case 'Analysis':
				case 'Article':
				case 'Recipe':
				case 'MatchReport':
				case 'Quiz':
				case 'AdvertisementFeature':
					return (
						<ImmersiveLayout
							CAPI={CAPI}
							NAV={NAV}
							display={Display.Immersive}
							design={design}
							pillar={pillar}
						/>
					);
			}
			break;
		}
		case Display.Showcase: {
			switch (design) {
				case 'Comment':
				case 'GuardianView':
					return (
						<CommentLayout
							CAPI={CAPI}
							NAV={NAV}
							display={Display.Showcase}
							design={design}
							pillar={pillar}
						/>
					);
				case 'Feature':
				case 'Review':
				case 'Interview':
				case 'Live':
				case 'Media':
				case 'PhotoEssay':
				case 'Analysis':
				case 'Article':
				case 'Recipe':
				case 'MatchReport':
				case 'Quiz':
				case 'AdvertisementFeature':
					return (
						<ShowcaseLayout
							CAPI={CAPI}
							NAV={NAV}
							display={Display.Showcase}
							design={design}
							pillar={pillar}
						/>
					);
			}
			break;
		}
		case Display.Standard:
		default: {
			switch (design) {
				case 'Comment':
				case 'GuardianView':
					return (
						<CommentLayout
							CAPI={CAPI}
							NAV={NAV}
							display={Display.Standard}
							design={design}
							pillar={pillar}
						/>
					);
				case 'Feature':
				case 'Review':
				case 'Interview':
				case 'Live':
				case 'Media':
				case 'PhotoEssay':
				case 'Analysis':
				case 'Article':
				case 'Recipe':
				case 'MatchReport':
				case 'Quiz':
				case 'AdvertisementFeature':
					return (
						<StandardLayout
							CAPI={CAPI}
							NAV={NAV}
							display={Display.Standard}
							design={design}
							pillar={pillar}
						/>
					);
			}
			break;
		}
	}

	return (
		<StandardLayout
			CAPI={CAPI}
			NAV={NAV}
			display={Display.Standard}
			design={design}
			pillar={pillar}
		/>
	);
};
