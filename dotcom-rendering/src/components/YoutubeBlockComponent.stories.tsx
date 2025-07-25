import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';
import { Section } from './Section';
import { YoutubeBlockComponent } from './YoutubeBlockComponent.importable';

export default {
	component: YoutubeBlockComponent,
	title: 'Components/YoutubeBlockComponent',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Section fullWidth={true} showTopBorder={false}>
		<Flex>
			<LeftColumn borderType="full">
				<></>
			</LeftColumn>
			<div
				css={css`
					max-width: 620px;
					padding: 20px;
				`}
			>
				{children}
			</div>
			<RightColumn>
				<></>
			</RightColumn>
		</Flex>
	</Section>
);

export const Default = () => {
	return (
		<Wrapper>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
			<YoutubeBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				index={0}
				expired={false}
				stickyVideos={false}
				enableAds={false}
				showTextOverlay={false}
				iconSizeOnDesktop="large"
				iconSizeOnMobile="large"
				hidePillOnMobile={false}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
		</Wrapper>
	);
};
Default.storyName = 'default';

export const Vertical = () => {
	return (
		<Wrapper>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
			<YoutubeBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				index={0}
				expired={false}
				height={259}
				width={460}
				stickyVideos={false}
				enableAds={false}
				showTextOverlay={false}
				iconSizeOnDesktop="large"
				iconSizeOnMobile="large"
				hidePillOnMobile={false}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
		</Wrapper>
	);
};
Vertical.storyName = 'with height and width set';

export const Expired = () => {
	return (
		<Wrapper>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
			<YoutubeBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				index={0}
				expired={true}
				overrideImage="https://i.guim.co.uk/img/media/49565a29c6586fe6b748926e0be96c5e9c90473c/0_0_4981_2989/500.jpg?quality=85&auto=format&fit=max&s=17c70ec70002ea34886fd6c2605cd81e"
				height={259}
				width={460}
				stickyVideos={false}
				enableAds={false}
				showTextOverlay={false}
				iconSizeOnDesktop="large"
				iconSizeOnMobile="large"
				hidePillOnMobile={false}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
		</Wrapper>
	);
};
Expired.storyName = 'expired video';

export const WithOverlayImage = () => {
	return (
		<Wrapper>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
			<YoutubeBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				index={0}
				expired={false}
				duration={333}
				overrideImage="https://i.guim.co.uk/img/media/49565a29c6586fe6b748926e0be96c5e9c90473c/0_0_4981_2989/500.jpg?quality=85&auto=format&fit=max&s=17c70ec70002ea34886fd6c2605cd81e"
				height={259}
				width={460}
				stickyVideos={false}
				enableAds={false}
				showTextOverlay={false}
				iconSizeOnDesktop="large"
				iconSizeOnMobile="large"
				hidePillOnMobile={false}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
		</Wrapper>
	);
};
WithOverlayImage.storyName = 'with overlay image';

export const Withimage = () => {
	return (
		<Wrapper>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
			<YoutubeBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				index={0}
				expired={false}
				duration={333}
				posterImage="https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/4255.jpg"
				height={259}
				width={460}
				stickyVideos={false}
				enableAds={false}
				showTextOverlay={false}
				iconSizeOnDesktop="large"
				iconSizeOnMobile="large"
				hidePillOnMobile={false}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
		</Wrapper>
	);
};
Withimage.storyName = 'with poster image';

export const WithPosterAndOverlayImage = () => {
	const title =
		"Prince Harry and Meghan's 'bombshell' plans explained – video";
	return (
		<Wrapper>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
			<YoutubeBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				assetId="d2Q5bXvEgMg"
				mediaTitle={title}
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				index={0}
				expired={false}
				overrideImage="https://i.guim.co.uk/img/media/49565a29c6586fe6b748926e0be96c5e9c90473c/0_0_4981_2989/500.jpg?quality=85&auto=format&fit=max&s=17c70ec70002ea34886fd6c2605cd81e"
				duration={333}
				posterImage="https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/4255.jpg"
				height={259}
				width={460}
				stickyVideos={false}
				enableAds={false}
				showTextOverlay={false}
				iconSizeOnDesktop="large"
				iconSizeOnMobile="large"
				hidePillOnMobile={false}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
		</Wrapper>
	);
};
WithPosterAndOverlayImage.storyName = 'with poster and overlay image';

export const WithShowMainVideoFlagOff = () => {
	const title =
		"Prince Harry and Meghan's 'bombshell' plans explained – video";

	return (
		<Wrapper>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
			<YoutubeBlockComponent
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				assetId="d2Q5bXvEgMg"
				mediaTitle={title}
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				index={0}
				expired={false}
				overrideImage="https://i.guim.co.uk/img/media/49565a29c6586fe6b748926e0be96c5e9c90473c/0_0_4981_2989/500.jpg?quality=85&auto=format&fit=max&s=17c70ec70002ea34886fd6c2605cd81e"
				duration={333}
				posterImage="https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/4255.jpg"
				height={259}
				width={460}
				stickyVideos={false}
				enableAds={false}
				showTextOverlay={false}
				iconSizeOnDesktop="large"
				iconSizeOnMobile="large"
				hidePillOnMobile={false}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
			</p>
		</Wrapper>
	);
};
WithShowMainVideoFlagOff.storyName = 'with show main video flag off';
