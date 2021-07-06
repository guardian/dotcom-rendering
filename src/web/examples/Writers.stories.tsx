/* eslint-disable react/jsx-props-no-spreading */

import { css } from '@emotion/react';

import { ContainerLayout } from '@frontend/web/components/ContainerLayout';
import { ElementContainer } from '@frontend/web/components/ElementContainer';
import { Header } from '@frontend/web/components/Header';
import { Footer } from '@frontend/web/components/Footer';
import { UL } from '@frontend/web/components/Card/components/UL';
import { LI } from '@frontend/web/components/Card/components/LI';
import { Nav } from '@root/src/web/components/Nav/Nav';

import { Lines } from '@guardian/src-ed-lines';
import { Display, Pillar, Design } from '@guardian/types';

import {
	brandBorder,
	brandBackground,
	brandLine,
	background,
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

const Author = (): JSX.Element => (
	<div
		css={css`
			padding-top: 0.25rem;
			padding-bottom: 0.75rem;
			border-top: 0.0625rem solid ${neutral[93]};
			${headline.xxxsmall({ fontWeight: 'bold' })}
		`}
	>
		Jane Doe
	</div>
);

export default {
	title: 'Examples/Writers',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
	},
};

export const Writers = (): React.ReactNode => (
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
			title="Columnists"
			sideBorders={true}
			padContent={false}
		>
			<>
				<UL direction="row" bottomMargin={true}>
					<LI padSides={true}>
						<Grey padded={false} heightInPixels={230} />
					</LI>
					<LI padSides={true} showDivider={true}>
						<Grey padded={false} heightInPixels={230} />
					</LI>
					<LI padSides={true} showDivider={true}>
						<Grey padded={false} heightInPixels={230} />
					</LI>
					<LI padSides={true} showDivider={true}>
						<Grey padded={false} heightInPixels={230} />
					</LI>
				</UL>
				<UL direction="row">
					<LI padSides={true}>
						<Grey padded={false} heightInPixels={70} />
					</LI>
					<LI padSides={true} showDivider={true}>
						<Grey padded={false} heightInPixels={70} />
					</LI>
					<LI padSides={true} showDivider={true}>
						<Grey padded={false} heightInPixels={70} />
					</LI>
					<LI padSides={true} showDivider={true}>
						<Grey padded={false} heightInPixels={70} />
					</LI>
				</UL>
			</>
		</ContainerLayout>
		<ContainerLayout
			showTopBorder={true}
			title="News"
			sideBorders={true}
			centralBorder="partial"
			padContent={false}
		>
			<UL direction="row">
				<LI percentage="25%">
					<UL direction="column">
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
					</UL>
				</LI>
				<LI percentage="25%">
					<UL direction="column" showDivider={true}>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
					</UL>
				</LI>
				<LI percentage="25%">
					<UL direction="column" showDivider={true}>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
					</UL>
				</LI>
				<LI percentage="25%">
					<UL direction="column" showDivider={true}>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
					</UL>
				</LI>
			</UL>
		</ContainerLayout>
		<ContainerLayout
			showTopBorder={true}
			title="Film"
			sideBorders={true}
			centralBorder="partial"
			padContent={false}
		>
			<UL direction="row">
				<LI percentage="25%">
					<UL direction="column">
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
					</UL>
				</LI>
				<LI percentage="25%">
					<UL direction="column" showDivider={true}>
						<LI padSides={true}>
							<Author />
						</LI>
						<LI padSides={true}>
							<Author />
						</LI>
					</UL>
				</LI>
				<LI percentage="25%">
					<UL direction="column" showDivider={true}>
						<LI padSides={true}>
							<Author />
						</LI>
					</UL>
				</LI>
			</UL>
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
Writers.story = { name: 'Example writers page' };
