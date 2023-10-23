import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { lightDecorator } from '../../.storybook/theme-decorators';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import { FixedMediumFastXI } from './FixedMediumFastXI';
import { FrontSection } from './FrontSection';

const articleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Comment,
	theme: Pillar.Opinion,
};

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
	>
		<FixedMediumFastXI trails={trails.slice(0, 1)} imageLoading="eager" />
	</FrontSection>
);
OneTrail.storyName = 'with one trail';

export const TwoTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumFastXI trails={trails.slice(0, 2)} imageLoading="eager" />
	</FrontSection>
);
TwoTrails.storyName = 'with two trails';

export const ThreeTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumFastXI trails={trails.slice(0, 3)} imageLoading="eager" />
	</FrontSection>
);
ThreeTrails.storyName = 'with three trails';

export const FourTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumFastXI trails={trails.slice(0, 4)} imageLoading="eager" />
	</FrontSection>
);
FourTrails.storyName = 'with four trails';

export const FiveTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumFastXI trails={trails.slice(0, 5)} imageLoading="eager" />
	</FrontSection>
);
FiveTrails.storyName = 'with five trails';

export const SixTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumFastXI trails={trails.slice(0, 6)} imageLoading="eager" />
	</FrontSection>
);
SixTrails.storyName = 'with six trails';

export const SevenTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumFastXI trails={trails.slice(0, 7)} imageLoading="eager" />
	</FrontSection>
);
SevenTrails.storyName = 'with seven trails';
SevenTrails.decorators = [lightDecorator(articleFormat)];

export const EightTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumFastXI trails={trails.slice(0, 8)} imageLoading="eager" />
	</FrontSection>
);
EightTrails.storyName = 'with eight trails';
EightTrails.decorators = [lightDecorator(articleFormat)];

export const NineTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumFastXI trails={trails.slice(0, 9)} imageLoading="eager" />
	</FrontSection>
);
NineTrails.storyName = 'with nine trails';
NineTrails.decorators = [lightDecorator(articleFormat)];

export const TenTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumFastXI trails={trails.slice(0, 10)} imageLoading="eager" />
	</FrontSection>
);
TenTrails.storyName = 'with ten trails';
TenTrails.decorators = [lightDecorator(articleFormat)];

export const ElevenTrails = () => (
	<FrontSection
		title="Fixed Medium Fast XI"
		discussionApiUrl={discussionApiUrl}
	>
		<FixedMediumFastXI trails={trails.slice(0, 11)} imageLoading="eager" />
	</FrontSection>
);
ElevenTrails.storyName = 'with eleven trails';
ElevenTrails.decorators = [lightDecorator(articleFormat)];
