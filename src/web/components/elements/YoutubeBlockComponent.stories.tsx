import { css } from '@emotion/react';

import { Display, Design, Pillar } from '@guardian/types';

import { decidePalette } from '@root/src/web/lib/decidePalette';

import { ElementContainer } from '../ElementContainer';
import { Flex } from '../Flex';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';

import { YoutubeBlockComponent } from './YoutubeBlockComponent';

export default {
	component: YoutubeBlockComponent,
	title: 'Components/YoutubeBlockComponent',
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<ElementContainer showTopBorder={false}>
		<Flex>
			<LeftColumn>
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
	</ElementContainer>
);

export const Default = () => {
	return (
		<Container>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
			<YoutubeBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				expired={false}
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
		</Container>
	);
};
Default.story = { name: 'default' };

export const Vertical = () => {
	return (
		<Container>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
			<YoutubeBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				expired={false}
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				height={259}
				width={460}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
		</Container>
	);
};
Vertical.story = { name: 'with height and width set' };

export const Expired = () => {
	return (
		<Container>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
			<YoutubeBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				expired={true}
				overrideImage="https://i.guim.co.uk/img/media/49565a29c6586fe6b748926e0be96c5e9c90473c/0_0_4981_2989/500.jpg?quality=85&auto=format&fit=max&s=17c70ec70002ea34886fd6c2605cd81e"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				height={259}
				width={460}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
		</Container>
	);
};
Expired.story = { name: 'expired video' };

export const WithOverlayImage = () => {
	return (
		<Container>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
			<YoutubeBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				expired={false}
				duration={333}
				overrideImage="https://i.guim.co.uk/img/media/49565a29c6586fe6b748926e0be96c5e9c90473c/0_0_4981_2989/500.jpg?quality=85&auto=format&fit=max&s=17c70ec70002ea34886fd6c2605cd81e"
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				height={259}
				width={460}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
		</Container>
	);
};
WithOverlayImage.story = { name: 'with overlay image' };

export const WithPosterImage = () => {
	return (
		<Container>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
			<YoutubeBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				expired={false}
				duration={333}
				posterImage={[
					{
						url:
							'https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/2000.jpg',
						width: 2000,
					},
					{
						url:
							'https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/1000.jpg',
						width: 1000,
					},
					{
						url:
							'https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/500.jpg',
						width: 500,
					},
					{
						url:
							'https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/140.jpg',
						width: 140,
					},
					{
						url:
							'https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/4255.jpg',
						width: 4255,
					},
				]}
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				height={259}
				width={460}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
		</Container>
	);
};
WithPosterImage.story = { name: 'with poster image' };

export const WithPosterAndOverlayImage = () => {
	return (
		<Container>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
			<YoutubeBlockComponent
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				assetId="d2Q5bXvEgMg"
				mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
				id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
				expired={false}
				overrideImage="https://i.guim.co.uk/img/media/49565a29c6586fe6b748926e0be96c5e9c90473c/0_0_4981_2989/500.jpg?quality=85&auto=format&fit=max&s=17c70ec70002ea34886fd6c2605cd81e"
				duration={333}
				posterImage={[
					{
						url:
							'https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/2000.jpg',
						width: 2000,
					},
					{
						url:
							'https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/1000.jpg',
						width: 1000,
					},
					{
						url:
							'https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/500.jpg',
						width: 500,
					},
					{
						url:
							'https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/140.jpg',
						width: 140,
					},
					{
						url:
							'https://media.guim.co.uk/45c34a4312b228773b1bdec415b4253667b21ae3/0_0_4255_2394/4255.jpg',
						width: 4255,
					},
				]}
				// eslint-disable-next-line jsx-a11y/aria-role
				role="inline"
				height={259}
				width={460}
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.{' '}
			</p>
		</Container>
	);
};
WithPosterAndOverlayImage.story = { name: 'with poster and overlay image' };
