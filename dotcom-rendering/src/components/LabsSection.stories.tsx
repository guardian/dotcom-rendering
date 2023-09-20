import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source-foundations';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { LI } from './Card/components/LI';
import { FrontSection } from './FrontSection';
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
			title="Guardian Labs Without Badge"
			ajaxUrl={''}
			sectionId={''}
			collectionId={''}
			pageId={''}
			ophanComponentName={''}
			ophanComponentLink={''}
			discussionApiUrl={discussionApiUrl}
		>
			<Placeholder />
		</LabsSection>
	);
};
WithoutBadgeStory.storyName = 'without badge';

export const WithBadgeStory = () => {
	return (
		<LabsSection
			title="Guardian Labs With Badge"
			ajaxUrl={''}
			sectionId={''}
			collectionId={''}
			pageId={''}
			ophanComponentName={''}
			ophanComponentLink={''}
			badge={{
				imageSrc:
					'https://static.theguardian.com/commercial/sponsor/17/Apr/2023/6c577c8c-b60f-4041-baa3-f4852219d3ff-OS_logo_strapline_colour_rgb_280.png',
				href: 'https://www.theguardian.com/guardian-labs',
			}}
			discussionApiUrl={discussionApiUrl}
		>
			<Placeholder />
		</LabsSection>
	);
};
WithBadgeStory.storyName = 'with badge';

export const InContext = () => {
	return (
		<>
			<FrontSection
				title="Default Container"
				showTopBorder={false}
				discussionApiUrl={discussionApiUrl}
			>
				<Placeholder />
			</FrontSection>
			<LabsSection
				title="Sitting in-between other sections"
				ajaxUrl={''}
				sectionId={''}
				collectionId={''}
				pageId={''}
				ophanComponentName={''}
				ophanComponentLink={''}
				badge={{
					imageSrc:
						'https://static.theguardian.com/commercial/sponsor/17/Apr/2023/6c577c8c-b60f-4041-baa3-f4852219d3ff-OS_logo_strapline_colour_rgb_280.png',
					href: 'https://www.theguardian.com/guardian-labs',
				}}
				discussionApiUrl={discussionApiUrl}
			>
				<Placeholder />
			</LabsSection>
			<FrontSection
				title="Default Container"
				showTopBorder={true}
				discussionApiUrl={discussionApiUrl}
			>
				<Placeholder />
			</FrontSection>
		</>
	);
};
InContext.storyName = 'shown in context';
