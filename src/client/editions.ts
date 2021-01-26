import {
	initPingEditionsRendering,
	MessageKind,
	pingEditionsNative,
} from '@guardian/renditions';
import { ShareIcon } from 'components/editions/shareIcon';
import { createElement as h } from 'react';
import ReactDOM from 'react-dom';

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

initLightbox();

ReactDOM.render(h(ShareIcon), document.querySelector('.js-share-button'));
