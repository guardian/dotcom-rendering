/* eslint-disable react/jsx-props-no-spreading */

import { css } from '@emotion/react';

import { ContainerLayout } from '@frontend/web/components/ContainerLayout';
import { ElementContainer } from '@frontend/web/components/ElementContainer';
import { Header } from '@frontend/web/components/Header';
import { Footer } from '@frontend/web/components/Footer';
import { Nav } from '@root/src/web/components/Nav/Nav';

import { Lines } from '@guardian/src-ed-lines';
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
		<ElementContainer
			showTopBorder={false}
			showSideBorders={true}
			borderColour={brandLine.primary}
			padded={false}
			backgroundColour={brandBackground.primary}
		>
			<Header edition="UK" />
		</ElementContainer>
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
					display: Display.Standard,
					design: Design.Article,
				}}
				nav={NAV}
				subscribeUrl=""
				edition="UK"
			/>
		</ElementContainer>
		<ElementContainer
			backgroundColour={background.primary}
			padded={false}
			showTopBorder={false}
			showSideBorders={true}
		>
			<Lines count={4} effect="straight" />
		</ElementContainer>
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
		<ElementContainer
			backgroundColour={background.primary}
			padded={false}
			showTopBorder={false}
		>
			<Lines count={4} effect="straight" />
		</ElementContainer>
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
Sections.story = { name: 'Example using different sections' };
