import { css } from '@emotion/react';
import { ArticlePillar } from '@guardian/libs';
import {
	brand,
	breakpoints,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Standard } from '../../../fixtures/generated/articles/Standard';
import { extractNAV } from '../../model/extract-nav';
import { editionList } from '../lib/edition';
import { Footer } from './Footer';
import { Section } from './Section';

const Wrapper = ({ children }: { children: JSX.Element }) => (
	<Section
		fullWidth={true}
		padSides={false}
		backgroundColour={brand[400]}
		borderColour={neutral[93]}
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
				css={css`
					position: relative;
					padding: ${space[6]} 0;
				`}
			>
				<h1
					css={css`
						color: ${brand[400]};
						${textSans.xxxlarge()};
					`}
				>
					{editionId} Footer
				</h1>
				<Wrapper>
					<Footer
						pageFooter={Standard.pageFooter}
						pillar={ArticlePillar.News}
						pillars={extractNAV(Standard.nav).pillars}
						urls={Standard.nav.readerRevenueLinks.header}
						editionId={editionId}
						contributionsServiceUrl={
							Standard.contributionsServiceUrl
						}
					/>
				</Wrapper>
			</li>
		))}
	</ul>
);
Footers.story = {
	name: 'Footer for all editions',
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
