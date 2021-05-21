/* eslint-disable react/jsx-props-no-spreading */

import { css } from 'emotion';

import { ContainerLayout } from '@frontend/web/components/ContainerLayout';
import { Section } from '@frontend/web/components/Section';
import { Header } from '@frontend/web/components/Header';
import { Footer } from '@frontend/web/components/Footer';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { Nav } from '@root/src/web/components/Nav/Nav';

import { Display, Pillar, Design } from '@guardian/types';

import {
	brandBorder,
	brandBackground,
	brandLine,
	background,
	brandAltBackground,
	neutral,
} from '@guardian/src-foundations/palette';

import { NAV, pageFooter } from './Example.mocks';
import { decidePalette } from '../lib/decidePalette';

const Grey = ({
	heightInPixels = 400,
	padded = true,
}: {
	heightInPixels?: number;
	padded?: boolean;
}) => (
	<div
		className={css`
			background-color: ${neutral[93]};
			width: 100%;
			height: ${heightInPixels}px;
			margin: ${padded && '10px'};
		`}
	/>
);

export default {
	title: 'Examples/Sections',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
	},
};

export const Sections = (): React.ReactNode => (
	<>
		<Section
			showTopBorder={false}
			showSideBorders={true}
			borderColour={brandLine.primary}
			padded={false}
			backgroundColour={brandBackground.primary}
		>
			<Header edition="UK" />
		</Section>
		<Section
			showSideBorders={true}
			borderColour={brandLine.primary}
			showTopBorder={false}
			padded={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				format={{
					theme: Pillar.News,
					display: Display.Standard,
					design: Design.Article,
				}}
				nav={NAV}
				subscribeUrl=""
				edition="UK"
			/>
		</Section>
		<Section
			backgroundColour={background.primary}
			padded={false}
			showTopBorder={false}
			showSideBorders={true}
		>
			<GuardianLines
				count={4}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
			/>
		</Section>
		<ContainerLayout
			showTopBorder={false}
			title="Page Title"
			sideBorders={true}
		/>
		<ContainerLayout
			title="Section Title"
			description="Description"
			centralBorder="full"
			sideBorders={true}
			showTopBorder={true}
		>
			<Grey />
		</ContainerLayout>
		<ContainerLayout
			title="World"
			description="Decription"
			centralBorder="full"
			sideBorders={true}
			showTopBorder={true}
		>
			<Grey />
		</ContainerLayout>
		<ContainerLayout
			title="Video"
			fontColour="white"
			backgroundColour={brandAltBackground.ctaPrimary}
			sideBorders={false}
			showTopBorder={false}
		>
			<Grey />
		</ContainerLayout>
		<ContainerLayout
			centralBorder="full"
			title="Title"
			description="Decription"
			sideBorders={true}
		>
			<Grey />
		</ContainerLayout>
		<Section
			backgroundColour={background.primary}
			padded={false}
			showTopBorder={false}
		>
			<GuardianLines
				count={4}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
			/>
		</Section>
		<Section
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
		</Section>
	</>
);
Sections.story = { name: 'Example using different sections' };
