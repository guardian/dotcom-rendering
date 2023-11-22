
/*
 * DO NOT EDIT THIS FILE DIRECTLY
 * These stories were auto-generated by `dotcom-rendering/scripts/gen-stories/gen-stories.js`
 */
import { ArticleDesign, ArticleDisplay, ArticleSpecial, Pillar } from '@guardian/libs';
import { darkDecorator, lightDecorator } from '../../.storybook/decorators/themeDecorator';
import { HydratedLayoutWrapper } from '../../src/layouts/Layout.stories';

// eslint-disable-next-line import/no-default-export -- we need a default here
export default {
	title: 'Components/Layout/Format Variations',
	component: HydratedLayoutWrapper,
	parameters: {
		chromatic: {
			diffThreshold: 0.2,
			pauseAnimationAtEnd: true,
			delay: 1200, // ensure that OnwardsUpper shows relevant data
		},
	},
};

		export const WebStandardStandardNewsPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="Standard"
					theme="NewsPillar"
					renderingTarget="Web"
				/>
			);
		};
		WebStandardStandardNewsPillarLight.storyName = 'Web: Display: Standard, Design: Standard, Theme: NewsPillar, Mode: Light';
		WebStandardStandardNewsPillarLight.parameters = { config: {"renderingTarget":"Web","darkModeAvailable":false} };
		WebStandardStandardNewsPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: {...ArticleSpecial, ...Pillar}.News,
				}]
			),
		];

		

		export const AppsStandardStandardNewsPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="Standard"
					theme="NewsPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardStandardNewsPillarLight.storyName = 'Apps: Display: Standard, Design: Standard, Theme: NewsPillar, Mode: Light';
		AppsStandardStandardNewsPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardStandardNewsPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: {...ArticleSpecial, ...Pillar}.News,
				}]
			),
		];

		export const AppsStandardStandardNewsPillarDark = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="Standard"
					theme="NewsPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardStandardNewsPillarDark.storyName = 'Apps: Display: Standard, Design: Standard, Theme: NewsPillar, Mode: Dark';
		AppsStandardStandardNewsPillarDark.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardStandardNewsPillarDark.decorators = [darkDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: {...ArticleSpecial, ...Pillar}.News,
				}]
			),
		];

		export const AppsShowcaseStandardNewsPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Showcase"
					designName="Standard"
					theme="NewsPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsShowcaseStandardNewsPillarLight.storyName = 'Apps: Display: Showcase, Design: Standard, Theme: NewsPillar, Mode: Light';
		AppsShowcaseStandardNewsPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":false} };
		AppsShowcaseStandardNewsPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Showcase,
					design: ArticleDesign.Standard,
					theme: {...ArticleSpecial, ...Pillar}.News,
				}]
			),
		];

		

		export const WebShowcasePictureOpinionPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Showcase"
					designName="Picture"
					theme="OpinionPillar"
					renderingTarget="Web"
				/>
			);
		};
		WebShowcasePictureOpinionPillarLight.storyName = 'Web: Display: Showcase, Design: Picture, Theme: OpinionPillar, Mode: Light';
		WebShowcasePictureOpinionPillarLight.parameters = { config: {"renderingTarget":"Web","darkModeAvailable":false} };
		WebShowcasePictureOpinionPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Showcase,
					design: ArticleDesign.Picture,
					theme: {...ArticleSpecial, ...Pillar}.Opinion,
				}]
			),
		];

		

		export const AppsShowcasePictureOpinionPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Showcase"
					designName="Picture"
					theme="OpinionPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsShowcasePictureOpinionPillarLight.storyName = 'Apps: Display: Showcase, Design: Picture, Theme: OpinionPillar, Mode: Light';
		AppsShowcasePictureOpinionPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":false} };
		AppsShowcasePictureOpinionPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Showcase,
					design: ArticleDesign.Picture,
					theme: {...ArticleSpecial, ...Pillar}.Opinion,
				}]
			),
		];

		

		export const AppsStandardCommentNewsPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="Comment"
					theme="NewsPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardCommentNewsPillarLight.storyName = 'Apps: Display: Standard, Design: Comment, Theme: NewsPillar, Mode: Light';
		AppsStandardCommentNewsPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":false} };
		AppsStandardCommentNewsPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.Comment,
					theme: {...ArticleSpecial, ...Pillar}.News,
				}]
			),
		];

		

		export const AppsStandardInteractiveNewsPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="Interactive"
					theme="NewsPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardInteractiveNewsPillarLight.storyName = 'Apps: Display: Standard, Design: Interactive, Theme: NewsPillar, Mode: Light';
		AppsStandardInteractiveNewsPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":false} };
		AppsStandardInteractiveNewsPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.Interactive,
					theme: {...ArticleSpecial, ...Pillar}.News,
				}]
			),
		];

		

		export const AppsImmersiveStandardNewsPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Immersive"
					designName="Standard"
					theme="NewsPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsImmersiveStandardNewsPillarLight.storyName = 'Apps: Display: Immersive, Design: Standard, Theme: NewsPillar, Mode: Light';
		AppsImmersiveStandardNewsPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":false} };
		AppsImmersiveStandardNewsPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Immersive,
					design: ArticleDesign.Standard,
					theme: {...ArticleSpecial, ...Pillar}.News,
				}]
			),
		];

		

		export const WebImmersivePhotoEssayLabsLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Immersive"
					designName="PhotoEssay"
					theme="Labs"
					renderingTarget="Web"
				/>
			);
		};
		WebImmersivePhotoEssayLabsLight.storyName = 'Web: Display: Immersive, Design: PhotoEssay, Theme: Labs, Mode: Light';
		WebImmersivePhotoEssayLabsLight.parameters = { config: {"renderingTarget":"Web","darkModeAvailable":false} };
		WebImmersivePhotoEssayLabsLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Immersive,
					design: ArticleDesign.PhotoEssay,
					theme: {...ArticleSpecial, ...Pillar}.Labs,
				}]
			),
		];

		

		export const WebStandardStandardLabsLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="Standard"
					theme="Labs"
					renderingTarget="Web"
				/>
			);
		};
		WebStandardStandardLabsLight.storyName = 'Web: Display: Standard, Design: Standard, Theme: Labs, Mode: Light';
		WebStandardStandardLabsLight.parameters = { config: {"renderingTarget":"Web","darkModeAvailable":false} };
		WebStandardStandardLabsLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: {...ArticleSpecial, ...Pillar}.Labs,
				}]
			),
		];

		

		export const WebStandardFeatureLabsLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="Feature"
					theme="Labs"
					renderingTarget="Web"
				/>
			);
		};
		WebStandardFeatureLabsLight.storyName = 'Web: Display: Standard, Design: Feature, Theme: Labs, Mode: Light';
		WebStandardFeatureLabsLight.parameters = { config: {"renderingTarget":"Web","darkModeAvailable":false} };
		WebStandardFeatureLabsLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: {...ArticleSpecial, ...Pillar}.Labs,
				}]
			),
		];

		

		export const WebStandardRecipeLabsLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="Recipe"
					theme="Labs"
					renderingTarget="Web"
				/>
			);
		};
		WebStandardRecipeLabsLight.storyName = 'Web: Display: Standard, Design: Recipe, Theme: Labs, Mode: Light';
		WebStandardRecipeLabsLight.parameters = { config: {"renderingTarget":"Web","darkModeAvailable":false} };
		WebStandardRecipeLabsLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.Recipe,
					theme: {...ArticleSpecial, ...Pillar}.Labs,
				}]
			),
		];

		

		export const WebStandardLiveBlogNewsPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="NewsPillar"
					renderingTarget="Web"
				/>
			);
		};
		WebStandardLiveBlogNewsPillarLight.storyName = 'Web: Display: Standard, Design: LiveBlog, Theme: NewsPillar, Mode: Light';
		WebStandardLiveBlogNewsPillarLight.parameters = { config: {"renderingTarget":"Web","darkModeAvailable":false} };
		WebStandardLiveBlogNewsPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.News,
				}]
			),
		];

		

		export const AppsStandardLiveBlogOpinionPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="OpinionPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogOpinionPillarLight.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: OpinionPillar, Mode: Light';
		AppsStandardLiveBlogOpinionPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogOpinionPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.Opinion,
				}]
			),
		];

		export const AppsStandardLiveBlogOpinionPillarDark = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="OpinionPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogOpinionPillarDark.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: OpinionPillar, Mode: Dark';
		AppsStandardLiveBlogOpinionPillarDark.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogOpinionPillarDark.decorators = [darkDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.Opinion,
				}]
			),
		];

		export const AppsStandardLiveBlogSportPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="SportPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogSportPillarLight.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: SportPillar, Mode: Light';
		AppsStandardLiveBlogSportPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogSportPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.Sport,
				}]
			),
		];

		export const AppsStandardLiveBlogSportPillarDark = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="SportPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogSportPillarDark.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: SportPillar, Mode: Dark';
		AppsStandardLiveBlogSportPillarDark.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogSportPillarDark.decorators = [darkDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.Sport,
				}]
			),
		];

		export const AppsStandardLiveBlogCulturePillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="CulturePillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogCulturePillarLight.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: CulturePillar, Mode: Light';
		AppsStandardLiveBlogCulturePillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogCulturePillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.Culture,
				}]
			),
		];

		export const AppsStandardLiveBlogCulturePillarDark = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="CulturePillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogCulturePillarDark.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: CulturePillar, Mode: Dark';
		AppsStandardLiveBlogCulturePillarDark.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogCulturePillarDark.decorators = [darkDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.Culture,
				}]
			),
		];

		export const AppsStandardLiveBlogLifestylePillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="LifestylePillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogLifestylePillarLight.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: LifestylePillar, Mode: Light';
		AppsStandardLiveBlogLifestylePillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogLifestylePillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.Lifestyle,
				}]
			),
		];

		export const AppsStandardLiveBlogLifestylePillarDark = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="LifestylePillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogLifestylePillarDark.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: LifestylePillar, Mode: Dark';
		AppsStandardLiveBlogLifestylePillarDark.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogLifestylePillarDark.decorators = [darkDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.Lifestyle,
				}]
			),
		];

		export const AppsStandardLiveBlogSpecialReportPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="SpecialReportPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogSpecialReportPillarLight.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: SpecialReportPillar, Mode: Light';
		AppsStandardLiveBlogSpecialReportPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogSpecialReportPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.SpecialReport,
				}]
			),
		];

		export const AppsStandardLiveBlogSpecialReportPillarDark = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="SpecialReportPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogSpecialReportPillarDark.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: SpecialReportPillar, Mode: Dark';
		AppsStandardLiveBlogSpecialReportPillarDark.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogSpecialReportPillarDark.decorators = [darkDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.SpecialReport,
				}]
			),
		];

		export const AppsStandardLiveBlogLabsPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="LabsPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogLabsPillarLight.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: LabsPillar, Mode: Light';
		AppsStandardLiveBlogLabsPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogLabsPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.Labs,
				}]
			),
		];

		export const AppsStandardLiveBlogLabsPillarDark = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="LabsPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogLabsPillarDark.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: LabsPillar, Mode: Dark';
		AppsStandardLiveBlogLabsPillarDark.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogLabsPillarDark.decorators = [darkDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.Labs,
				}]
			),
		];

		export const AppsStandardLiveBlogSpecialReportAltPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="SpecialReportAltPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogSpecialReportAltPillarLight.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: SpecialReportAltPillar, Mode: Light';
		AppsStandardLiveBlogSpecialReportAltPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogSpecialReportAltPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.SpecialReportAlt,
				}]
			),
		];

		export const AppsStandardLiveBlogSpecialReportAltPillarDark = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="SpecialReportAltPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogSpecialReportAltPillarDark.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: SpecialReportAltPillar, Mode: Dark';
		AppsStandardLiveBlogSpecialReportAltPillarDark.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogSpecialReportAltPillarDark.decorators = [darkDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.SpecialReportAlt,
				}]
			),
		];

		export const AppsStandardLiveBlogNewsPillarLight = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="NewsPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogNewsPillarLight.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: NewsPillar, Mode: Light';
		AppsStandardLiveBlogNewsPillarLight.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogNewsPillarLight.decorators = [lightDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.News,
				}]
			),
		];

		export const AppsStandardLiveBlogNewsPillarDark = () => {
			return (
				<HydratedLayoutWrapper
					displayName="Standard"
					designName="LiveBlog"
					theme="NewsPillar"
					renderingTarget="Apps"
				/>
			);
		};
		AppsStandardLiveBlogNewsPillarDark.storyName = 'Apps: Display: Standard, Design: LiveBlog, Theme: NewsPillar, Mode: Dark';
		AppsStandardLiveBlogNewsPillarDark.parameters = { config: {"renderingTarget":"Apps","darkModeAvailable":true} };
		AppsStandardLiveBlogNewsPillarDark.decorators = [darkDecorator(
				[{
					display:  ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: {...ArticleSpecial, ...Pillar}.News,
				}]
			),
		];
