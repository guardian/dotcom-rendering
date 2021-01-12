/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { ContainerLayout } from '@frontend/web/components/ContainerLayout';
import { Section } from '@frontend/web/components/Section';
import { Header } from '@frontend/web/components/Header';
import { Footer } from '@frontend/web/components/Footer';
import { UL } from '@frontend/web/components/Card/components/UL';
import { LI } from '@frontend/web/components/Card/components/LI';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { Nav } from '@root/src/web/components/Nav/Nav';

import { Card } from '@frontend/web/components/Card/Card';

import { Display } from '@guardian/types/Format';

import {
	brandBorder,
	brandBackground,
	brandLine,
	background,
	neutral,
	brand,
	brandAltBackground,
} from '@guardian/src-foundations/palette';

import {
	images,
	headlines,
	standfirsts,
	kickers,
} from '@frontend/web/components/Card/Card.mocks';
import { NAV, pageFooter } from './Example.mocks';

export default {
	title: 'Examples/Front',
	parameters: {
		viewport: {
			// This has the effect of turning off the viewports addon by default
			defaultViewport: 'doesNotExist',
		},
	},
};

export const Front = () => (
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
				pillar="news"
				nav={NAV}
				display={Display.Standard}
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
			<GuardianLines count={4} pillar="news" />
		</Section>
		<ContainerLayout
			showTopBorder={false}
			title="Headlines"
			sideBorders={true}
			centralBorder="partial"
			padContent={false}
		>
			<UL direction="row" bottomMargin={true}>
				<LI percentage="75%" showDivider={false} padSides={true}>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="news"
						designType="Article"
						headlineText={headlines[0]}
						headlineSize="large"
						kickerText={kickers[4]}
						imageUrl={images[0]}
						imagePosition="right"
						imageSize="large"
						standfirst={standfirsts[0]}
					/>
				</LI>
				<LI
					percentage="25%"
					showDivider={true}
					showTopMarginWhenStacked={true}
					padSides={true}
				>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="news"
						designType="Article"
						headlineText="Munroe Bergdorf to advise Labour on LGBT issues"
						headlineSize="medium"
						kickerText={kickers[0]}
						imageUrl={images[5]}
						imagePosition="top"
						standfirst="Poll after poll shows people ow want action"
					/>
				</LI>
			</UL>
		</ContainerLayout>
		<ContainerLayout
			showTopBorder={false}
			title="Coronavirus"
			sideBorders={true}
			centralBorder="full"
			borderColour={neutral[86]}
			backgroundColour={neutral[93]}
			fontColour={brand[300]}
			padContent={false}
		>
			<UL direction="row">
				<LI percentage="50%" padSides={true}>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="culture"
						designType="Article"
						headlineText={headlines[2]}
						kickerText={kickers[1]}
						imageUrl={images[3]}
						imagePosition="top"
						standfirst={standfirsts[0]}
					/>
				</LI>
				<LI
					percentage="25%"
					showDivider={true}
					showTopMarginWhenStacked={true}
					padSides={true}
				>
					<UL direction="column">
						<LI bottomMargin={true} stretch={true}>
							<Card
								linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
								pillar="opinion"
								designType="GuardianView"
								headlineText={headlines[3]}
								kickerText="Editorial"
								imageUrl={images[6]}
								imagePosition="top"
								commentCount={82224}
							/>
						</LI>
						<LI bottomMargin={true} stretch={true}>
							<Card
								linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
								pillar="news"
								designType="Article"
								headlineText={headlines[4]}
								headlineSize="small"
							/>
						</LI>
					</UL>
				</LI>
				<LI
					percentage="25%"
					showDivider={true}
					showTopMarginWhenStacked={true}
					padSides={true}
				>
					<UL direction="column">
						<LI bottomMargin={true} stretch={true}>
							<Card
								linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
								pillar="sport"
								designType="Article"
								headlineText={headlines[6]}
								headlineSize="small"
								kickerText={kickers[3]}
								commentCount={26}
							/>
						</LI>
						<LI bottomMargin={true} stretch={true}>
							<Card
								linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
								pillar="news"
								designType="Article"
								headlineText={headlines[7]}
								headlineSize="small"
								kickerText={kickers[1]}
							/>
						</LI>
						<LI bottomMargin={true} stretch={true}>
							<Card
								linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
								pillar="news"
								designType="Article"
								headlineText={headlines[8]}
								headlineSize="small"
								kickerText={kickers[0]}
							/>
						</LI>
						<LI bottomMargin={true} stretch={true}>
							<Card
								linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
								pillar="news"
								designType="Article"
								headlineText={headlines[9]}
								headlineSize="small"
								kickerText={kickers[2]}
							/>
						</LI>
					</UL>
				</LI>
			</UL>
		</ContainerLayout>
		<ContainerLayout
			showTopBorder={false}
			title="Tip Us Off"
			backgroundColour={brandAltBackground.primary}
		/>
		<ContainerLayout
			showTopBorder={false}
			title="UK"
			sideBorders={true}
			centralBorder="partial"
			padContent={false}
		>
			<UL direction="row" bottomMargin={true}>
				<LI padSides={true}>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="news"
						designType="Live"
						headlineText={headlines[7]}
						headlineSize="medium"
						kickerText={kickers[3]}
						webPublicationDate="2019-11-11T09:45:30.000Z"
						imageUrl={images[5]}
						imagePosition="top"
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
				>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="sport"
						designType="Live"
						headlineText={headlines[8]}
						headlineSize="medium"
						kickerText={kickers[0]}
						webPublicationDate="2019-11-11T09:45:30.000Z"
						imageUrl={images[6]}
						imagePosition="top"
						commentCount={222864}
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
				>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="sport"
						designType="Comment"
						headlineText={headlines[8]}
						headlineSize="medium"
						kickerText={kickers[1]}
						webPublicationDate="2019-11-11T09:45:30.000Z"
						imageUrl={images[4]}
						imagePosition="top"
					/>
				</LI>
			</UL>
			<UL direction="row">
				<LI padSides={true}>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="news"
						designType="Article"
						headlineText={headlines[9]}
						headlineSize="small"
						kickerText={kickers[0]}
						webPublicationDate="2019-11-11T09:45:30.000Z"
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
				>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="sport"
						designType="Article"
						headlineText={headlines[10]}
						headlineSize="small"
						kickerText={kickers[2]}
						webPublicationDate="2019-11-11T09:45:30.000Z"
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
				>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="culture"
						designType="Interview"
						headlineText={headlines[1]}
						headlineSize="small"
						kickerText={kickers[1]}
						webPublicationDate="2019-11-11T09:45:30.000Z"
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
				>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="lifestyle"
						designType="Feature"
						headlineText={headlines[3]}
						headlineSize="small"
						kickerText={kickers[0]}
						webPublicationDate="2019-11-11T09:45:30.000Z"
					/>
				</LI>
			</UL>
		</ContainerLayout>
		<ContainerLayout
			showTopBorder={true}
			title="In Depth"
			sideBorders={true}
			centralBorder="partial"
			padContent={false}
		>
			<UL direction="row">
				<LI padSides={true}>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="opinion"
						designType="Comment"
						headlineText={headlines[11]}
						headlineSize="medium"
						showQuotes={true}
						byline="George Monbiot"
						kickerText={kickers[3]}
						webPublicationDate={'2019-11-11T09={45={30.000Z'}
						avatar={{
							src:
								'https://i.guim.co.uk/img/uploads/2017/10/06/George-Monbiot,-L.png?width=173&quality=85&auto=format&fit=max&s=be5b0d3f3aa55682e4930057fc3929a3',
							alt: 'Avatar alt text',
						}}
						showClock={true}
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
				>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="opinion"
						designType="Article"
						headlineText={headlines[11]}
						headlineSize="medium"
						webPublicationDate={'2019-11-11T09={45={30.000Z'}
						imageUrl={images[0]}
						imagePosition="top"
						showClock={true}
						commentCount={30989}
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
				>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						pillar="news"
						designType="Article"
						headlineText={headlines[11]}
						headlineSize="medium"
						kickerText={kickers[0]}
						webPublicationDate={'2019-11-11T09={45={30.000Z'}
						imageUrl={images[0]}
						imagePosition="top"
						showClock={true}
						commentCount={0}
					/>
				</LI>
				<LI
					padSides={true}
					showDivider={true}
					showTopMarginWhenStacked={true}
				>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						designType="Article"
						pillar="news"
						headlineText={headlines[11]}
						headlineSize="medium"
						kickerText={kickers[2]}
						webPublicationDate={'2019-11-11T09={45={30.000Z'}
						imageUrl={images[0]}
						imagePosition="top"
						showClock={true}
					/>
				</LI>
			</UL>
		</ContainerLayout>
		<ContainerLayout
			showTopBorder={false}
			title="Spotlight"
			sideBorders={true}
			centralBorder="partial"
			borderColour={neutral[46]}
			backgroundColour={neutral[0]}
			fontColour={neutral[100]}
			padContent={false}
		>
			<LI padSides={true}>
				<Card
					linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
					pillar="sport"
					designType="Media"
					headlineText={headlines[11]}
					headlineSize="large"
					kickerText={kickers[1]}
					webPublicationDate={'2019-11-11T09={45={30.000Z'}
					imageUrl={images[0]}
					imagePosition="right"
					imageSize="jumbo"
				/>
			</LI>
		</ContainerLayout>
		<Section
			backgroundColour={background.primary}
			padded={false}
			showTopBorder={false}
		>
			<GuardianLines count={4} pillar="news" />
		</Section>
		<Section
			padded={false}
			backgroundColour={brandBackground.primary}
			borderColour={brandBorder.primary}
			showSideBorders={false}
		>
			<Footer
				pageFooter={pageFooter}
				pillar="news"
				pillars={NAV.pillars}
			/>
		</Section>
	</>
);
Front.story = { name: 'Example front' };
