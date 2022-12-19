import { css } from '@emotion/react';
import { Image } from '@guardian/bridget/Image';
import { galleryClient } from '../../app/native/nativeApi';
import { getIslandsByName } from '../browser/islands/getIsandsByName';
import { getProps } from '../browser/islands/getProps';

type Props = {
	master: string;
	width: string;
	height: string;
	caption?: string;
	credit?: string;
};

const buttonStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
`;

const getLightboxElements = (): Props[] => {
	const elements = getIslandsByName('AppsLightbox');
	return elements.map((element) => getProps(element) as Props);
};

export const AppsLightbox = (props: Props) => {
	const launchLightbox = () => {
		const elements = getLightboxElements();

		const bridgetElements = elements.map(
			({ master, width, height, caption, credit }) =>
				new Image({
					url: master,
					caption,
					credit,
					width: parseInt(width),
					height: parseInt(height),
				}),
		);

		const selectedIndex = bridgetElements.findIndex(
			(element) => element.url === props.master,
		);

		void galleryClient.launchSlideshow(
			bridgetElements,
			selectedIndex,
			document.title,
		);
	};

	return (
		<button css={buttonStyles} type="button" onClick={launchLightbox}>
			View in fullscreen
		</button>
	);
};
