import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source-foundations';
import { LI } from './Card/components/LI';
import { LabsSection } from './LabsSection';

export default {
	component: LabsSection,
	title: 'Components/LabsSection',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

const Placeholder = ({
	heightInPixels = 400,
	text = 'Placeholder Content',
}: {
	heightInPixels?: number;
	text?: string;
}) => (
	<LI padSides={true}>
		<div
			css={css`
				background-color: lightgrey;
				width: 100%;
				height: ${heightInPixels}px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 2em;
				font-weight: 200;
			`}
		>
			{text}
		</div>
	</LI>
);

export const WithoutBadgeStory = () => {
	return (
		<LabsSection
			title="Guardian Labs With Badge"
			ajaxUrl={''}
			sectionId={''}
			collectionId={''}
			pageId={''}
			ophanComponentName={''}
			ophanComponentLink={''}
			containerPalette={'EventPalette'}
		>
			<Placeholder />
		</LabsSection>
	);
};
WithoutBadgeStory.storyName = 'Guardian Labs container without badge';
