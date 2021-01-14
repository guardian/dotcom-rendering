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
	const designType: DesignType = decideDesignType(CAPI.designType);
	const pillar: CAPIPillar = decidePillar({
		pillar: CAPI.pillar,
		design: designType,
	});

	switch (display) {
		case Display.Immersive: {
			switch (designType) {
				case 'Comment':
				case 'GuardianView':
					return (
						<ImmersiveLayout
							CAPI={CAPI}
							NAV={NAV}
							display={Display.Immersive}
							designType={designType}
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
							designType={designType}
							pillar={pillar}
						/>
					);
			}
			break;
		}
		case Display.Showcase: {
			switch (designType) {
				case 'Comment':
				case 'GuardianView':
					return (
						<CommentLayout
							CAPI={CAPI}
							NAV={NAV}
							display={Display.Showcase}
							designType={designType}
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
							designType={designType}
							pillar={pillar}
						/>
					);
			}
			break;
		}
		case Display.Standard:
		default: {
			switch (designType) {
				case 'Comment':
				case 'GuardianView':
					return (
						<CommentLayout
							CAPI={CAPI}
							NAV={NAV}
							display={Display.Standard}
							designType={designType}
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
							designType={designType}
							pillar={pillar}
						/>
					);
			}
			break;
		}
	}
};
