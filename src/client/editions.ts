import {
	initPingEditionsRendering,
	MessageKind,
	pingEditionsNative,
} from '@guardian/renditions';
import ShareIcon from 'components/editions/shareIcon';
import Video from 'components/editions/video';
import { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import interactives from './interactives';

initPingEditionsRendering();

const initLightbox = (): void => {
	const images = document.querySelectorAll('.js-launch-slideshow');

	Array.from(images).forEach((image: Element, index) => {
		const isMainImage = image.classList.contains('js-main-image');

		image.addEventListener('click', (e: Event) => {
			pingEditionsNative({
				kind: MessageKind.Lightbox,
				index,
				isMainImage,
			});
		});
	});
};

const adjustGalleryImages = (): void => {
	const figures: NodeListOf<HTMLElement> = document.querySelectorAll(
		'.editions-gallery-figure',
	);
	if (figures.length === 0) return;

	Array.from(figures).forEach((figure) => {
		const imageEl = figure.querySelector('img');
		const updateHeight = (): void => {
			const captionHeight =
				figure.querySelector('.editions-gallery-caption')
					?.clientHeight ?? 0;
			if (captionHeight > figure.clientHeight) {
				figure.style.minHeight = `${captionHeight}px`;
			}
		};

		if (imageEl) {
			if (imageEl.complete) {
				updateHeight();
			} else {
				imageEl.addEventListener('load', () => {
					updateHeight();
				});
			}
		}
	});
};

initLightbox();
adjustGalleryImages();
interactives();

ReactDOM.render(h(ShareIcon), document.querySelector('.js-share-button'));
ReactDOM.render(h(Video), document.querySelector('.js-video-container'));
