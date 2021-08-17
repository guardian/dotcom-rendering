/* eslint-disable react/jsx-props-no-spreading */

import { ContainerLayout } from '@frontend/web/components/ContainerLayout';
import { ElementContainer } from '@frontend/web/components/ElementContainer';
import { Header } from '@frontend/web/components/Header';
import { Footer } from '@frontend/web/components/Footer';
import { UL } from '@frontend/web/components/Card/components/UL';
import { LI } from '@frontend/web/components/Card/components/LI';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { Card } from '@frontend/web/components/Card/Card';

import { Lines } from '@guardian/src-ed-lines';
import { Display, Design, Pillar } from '@guardian/types';

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
			title="Headlines"
			sideBorders={true}
			centralBorder="partial"
			padContent={false}
		>
			<UL direction="row" bottomMargin={true}>
				<LI percentage="75%" showDivider={false} padSides={true}>
					<Card
						linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
						format={{
							display: Display.Standard,
							design: Design.Article,
							theme: Pillar.News,
						}}
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
						format={{
							display: Display.Standard,
							design: Design.Article,
							theme: Pillar.News,
						}}
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
						format={{
							display: Display.Standard,
							design: Design.Article,
							theme: Pillar.Culture,
						}}
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
								format={{
									display: Display.Standard,
									design: Design.Editorial,
									theme: Pillar.Opinion,
								}}
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
								format={{
									display: Display.Standard,
									design: Design.Article,
									theme: Pillar.News,
								}}
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
								format={{
									display: Display.Standard,
									design: Design.Article,
									theme: Pillar.Sport,
								}}
								headlineText={headlines[6]}
								headlineSize="small"
								kickerText={kickers[3]}
								commentCount={26}
							/>
						</LI>
						<LI bottomMargin={true} stretch={true}>
							<Card
								linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
								format={{
									display: Display.Standard,
									design: Design.Article,
									theme: Pillar.News,
								}}
								headlineText={headlines[7]}
								headlineSize="small"
								kickerText={kickers[1]}
							/>
						</LI>
						<LI bottomMargin={true} stretch={true}>
							<Card
								linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
								format={{
									display: Display.Standard,
									design: Design.Article,
									theme: Pillar.News,
								}}
								headlineText={headlines[8]}
								headlineSize="small"
								kickerText={kickers[0]}
							/>
						</LI>
						<LI bottomMargin={true} stretch={true}>
							<Card
								linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
								format={{
									display: Display.Standard,
									design: Design.Article,
									theme: Pillar.News,
								}}
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
						format={{
							display: Display.Standard,
							design: Design.LiveBlog,
							theme: Pillar.News,
						}}
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
						format={{
							display: Display.Standard,
							design: Design.DeadBlog,
							theme: Pillar.Sport,
						}}
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
						format={{
							display: Display.Standard,
							design: Design.Comment,
							theme: Pillar.Sport,
						}}
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
						format={{
							display: Display.Standard,
							design: Design.Article,
							theme: Pillar.News,
						}}
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
						format={{
							display: Display.Standard,
							design: Design.Article,
							theme: Pillar.Sport,
						}}
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
						format={{
							display: Display.Standard,
							design: Design.Interview,
							theme: Pillar.Culture,
						}}
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
						format={{
							display: Display.Standard,
							design: Design.Feature,
							theme: Pillar.Lifestyle,
						}}
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
						format={{
							display: Display.Standard,
							design: Design.Comment,
							theme: Pillar.Opinion,
						}}
						headlineText={headlines[11]}
						headlineSize="medium"
						showQuotes={true}
						byline="George Monbiot"
						kickerText={kickers[3]}
						webPublicationDate="2019-11-14T06:00:31Z"
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
						format={{
							display: Display.Standard,
							design: Design.Article,
							theme: Pillar.Opinion,
						}}
						headlineText={headlines[11]}
						headlineSize="medium"
						webPublicationDate="2019-11-14T06:00:31Z"
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
						format={{
							display: Display.Standard,
							design: Design.Article,
							theme: Pillar.News,
						}}
						headlineText={headlines[11]}
						headlineSize="medium"
						kickerText={kickers[0]}
						webPublicationDate="2019-11-14T06:00:31Z"
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
						format={{
							display: Display.Standard,
							design: Design.Article,
							theme: Pillar.News,
						}}
						headlineText={headlines[11]}
						headlineSize="medium"
						kickerText={kickers[2]}
						webPublicationDate="2019-11-14T06:00:31Z"
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
					format={{
						display: Display.Standard,
						design: Design.Media,
						theme: Pillar.Sport,
					}}
					headlineText={headlines[11]}
					headlineSize="large"
					kickerText={kickers[1]}
					webPublicationDate="2019-11-14T06:00:31Z"
					imageUrl={images[0]}
					imagePosition="right"
					imageSize="jumbo"
				/>
			</LI>
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
Front.story = { name: 'Example front' };
