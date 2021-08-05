/* eslint-disable react/jsx-props-no-spreading */

import { css } from '@emotion/react';

import { ContainerLayout } from '@frontend/web/components/ContainerLayout';
import { ElementContainer } from '@frontend/web/components/ElementContainer';
import { Footer } from '@frontend/web/components/Footer';
import { UL } from '@frontend/web/components/Card/components/UL';
import { LI } from '@frontend/web/components/Card/components/LI';
import { Nav } from '@root/src/web/components/Nav/Nav';

import { Display, Pillar, Design } from '@guardian/types';

import {
	brandBorder,
	brandBackground,
	brandLine,
	neutral,
} from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';

import { NAV, pageFooter } from './Example.mocks';

const Grey = ({
	heightInPixels = 400,
	padded = true,
}: {
	heightInPixels?: number;
	padded?: boolean;
}) => (
	<div
		css={css`
			background-color: ${neutral[93]};
			width: 100%;
			height: ${heightInPixels}px;
			margin: ${padded && '10px'};
		`}
	/>
);

export default {
	title: 'Examples/Newsletters',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
	},
};

export const Newsletters = (): React.ReactNode => (
	<>
		<ElementContainer
			showSideBorders={true}
			borderColour={brandLine.primary}
			showTopBorder={false}
			padded={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				format={{
					theme: Pillar.News,
					display: Display.Immersive,
					design: Design.Article,
				}}
				nav={NAV}
				subscribeUrl=""
				edition="UK"
			/>
		</ElementContainer>
		<ElementContainer showTopBorder={false} showSideBorders={true}>
			<h1
				css={css`
					padding-top: 1.5rem;
					padding-bottom: 1.5rem;
					${headline.xlarge({ fontWeight: 'bold' })}
				`}
			>
				Guardian newsletters: sign up
			</h1>
		</ElementContainer>
		<ContainerLayout
			title="News Roundups"
			sideBorders={true}
			showTopBorder={true}
		>
			<UL>
				<UL direction="row">
					<LI>
						<Grey heightInPixels={250} />
					</LI>
					<LI>
						<Grey heightInPixels={250} />
					</LI>
					<LI>
						<Grey heightInPixels={250} />
					</LI>
					<LI>
						<Grey heightInPixels={250} />
					</LI>
				</UL>
				<UL direction="row">
					<LI percentage="25%">
						<Grey heightInPixels={250} />
					</LI>
					<LI percentage="25%">
						<Grey heightInPixels={250} />
					</LI>
				</UL>
			</UL>
		</ContainerLayout>
		<ContainerLayout
			title="News by topic"
			sideBorders={true}
			showTopBorder={true}
		>
			<UL>
				<UL direction="row">
					<LI>
						<Grey heightInPixels={250} />
					</LI>
					<LI>
						<Grey heightInPixels={250} />
					</LI>
					<LI>
						<Grey heightInPixels={250} />
					</LI>
					<LI>
						<Grey heightInPixels={250} />
					</LI>
				</UL>
				<UL direction="row">
					<LI>
						<Grey heightInPixels={250} />
					</LI>
					<LI>
						<Grey heightInPixels={250} />
					</LI>
					<LI>
						<Grey heightInPixels={250} />
					</LI>
					<LI>
						<Grey heightInPixels={250} />
					</LI>
				</UL>
			</UL>
		</ContainerLayout>
		<ElementContainer
			padded={false}
			backgroundColour={brandBackground.primary}
			borderColour={brandBorder.primary}
			showSideBorders={false}
		>
			<Footer
				pageFooter={pageFooter}
				pillar={Pillar.News}
				pillars={NAV.pillars}
			/>
		</ElementContainer>
	</>
);
Newsletters.story = { name: 'Example email newsletters page' };
