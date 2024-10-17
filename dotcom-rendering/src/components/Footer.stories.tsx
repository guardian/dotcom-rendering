import { css } from '@emotion/react';
import {
	breakpoints,
	palette,
	space,
	textSans34,
} from '@guardian/source/foundations';
import { Standard } from '../../fixtures/generated/dcr-articles/Standard';
import { Pillar } from '../lib/articleFormat';
import { editionList } from '../lib/edition';
import { extractNAV } from '../model/extract-nav';
import { Footer } from './Footer';
import { Section } from './Section';

const Wrapper = ({ children }: { children: JSX.Element }) => (
	<Section
		fullWidth={true}
		padSides={false}
		backgroundColour={palette.brand[400]}
		borderColour={palette.neutral[93]}
		showSideBorders={false}
		element="footer"
	>
		{children}
	</Section>
);

export const Footers = () => (
	<ul>
		{editionList.map(({ editionId }) => (
			<li
				key={editionId}
				css={css`
					position: relative;
					padding: ${space[6]} 0;
				`}
			>
				<h1
					css={css`
						color: ${palette.brand[400]};
						${textSans34};
					`}
				>
					{editionId} Footer
				</h1>
				<Wrapper>
					<Footer
						pageFooter={Standard.frontendData.pageFooter}
						selectedPillar={Pillar.News}
						pillars={extractNAV(Standard.frontendData.nav).pillars}
						urls={
							Standard.frontendData.nav.readerRevenueLinks.header
						}
						editionId={editionId}
					/>
				</Wrapper>
			</li>
		))}
	</ul>
);
Footers.storyName = 'Footer for all editions';
Footers.story = {
	parameters: {
		chromatic: {
			viewports: Object.values(breakpoints),
		},
	},
};

export default {
	component: Footers,
	title: 'Components/Footer',
};
