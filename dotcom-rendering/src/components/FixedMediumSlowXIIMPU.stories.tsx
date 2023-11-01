import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedMediumSlowXIIMPU } from './FixedMediumSlowXIIMPU';
import { FrontSection } from './FrontSection';

export default {
	component: FixedMediumSlowXIIMPU,
	title: 'Components/FixedMediumSlowXIIMPU',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};

export const OneTrail = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 1)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
OneTrail.storyName = 'with one trail';

export const TwoTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 2)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
TwoTrails.storyName = 'with two trails';

export const ThreeTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 3)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
ThreeTrails.storyName = 'with three trails';

export const FourTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 4)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
FourTrails.storyName = 'with four trails';

export const FiveTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 5)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
FiveTrails.storyName = 'with five trails';

export const SixTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 6)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
SixTrails.storyName = 'with six trails';

export const SevenTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 7)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
SevenTrails.storyName = 'with seven trails';

export const EightTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 8)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
EightTrails.storyName = 'with eight trails';

export const NineTrails = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 9)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);
NineTrails.storyName = 'with nine trails';

export const EightTrailsNoAds = () => (
	<FrontSection
		title="Fixed Medium Slow XII MPU"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumSlowXIIMPU
			trails={trails.slice(0, 8)}
			showAge={true}
			imageLoading="eager"
		/>
	</FrontSection>
);

EightTrailsNoAds.storyName = 'with eight trails and no ad slot';
