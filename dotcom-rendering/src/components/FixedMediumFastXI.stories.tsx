import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedMediumFastXI } from './FixedMediumFastXI';
import { FrontSection } from './FrontSection';

export default {
	component: FixedMediumFastXI,
	title: 'Components/FixedMediumFastXI',
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
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 1)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
OneTrail.storyName = 'with one trail';

export const TwoTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 2)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
TwoTrails.storyName = 'with two trails';

export const ThreeTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 3)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
ThreeTrails.storyName = 'with three trails';

export const FourTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 4)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
FourTrails.storyName = 'with four trails';

export const FiveTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 5)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
FiveTrails.storyName = 'with five trails';

export const SixTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 6)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
SixTrails.storyName = 'with six trails';

export const SevenTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 7)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
SevenTrails.storyName = 'with seven trails';

export const EightTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 8)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
EightTrails.storyName = 'with eight trails';

export const NineTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 9)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
NineTrails.storyName = 'with nine trails';

export const TenTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 10)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
TenTrails.storyName = 'with ten trails';

export const ElevenTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
		editionId={'UK'}
	>
		<FixedMediumFastXI
			trails={trails.slice(0, 11)}
			imageLoading="eager"
			absoluteServerTimes={true}
		/>
	</FrontSection>
);
ElevenTrails.storyName = 'with eleven trails';
