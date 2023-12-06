import { none, some } from '../../vendor/@guardian/types/index';
import type { Image } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import { ImageSubtype } from 'image/image';
import { Optional } from 'optional';

const captionDoc = (): DocumentFragment => {
	const doc = new DocumentFragment();

	const location = document.createElement('strong');
	location.innerText = 'Photo strip: Circa 1900, 35 × 27mm. Provenance: US';

	const description = document.createTextNode(
		'Most of these images were taken when male partnerships were illegal. Approximately 120 years ago, this couple held opposite edges of a sign. They posed for that photo in a very different world than the one we live in today.',
	);

	doc.appendChild(location);
	doc.appendChild(description);
	return doc;
};

const srcset =
	'https://i.guim.co.uk/img/media/3e1d87f40e2ba9dc7607584222b82463c66dab26/0_0_2999_3543/master/2999.jpg?width=140&quality=85&fit=bounds&s=2bf934ce61f9f3137904793ea5b85c9a 140w, https://i.guim.co.uk/img/media/3e1d87f40e2ba9dc7607584222b82463c66dab26/0_0_2999_3543/master/2999.jpg?width=500&quality=85&fit=bounds&s=94dc44b35cec62a756b7987b9d4ddd0c 500w, https://i.guim.co.uk/img/media/3e1d87f40e2ba9dc7607584222b82463c66dab26/0_0_2999_3543/master/2999.jpg?width=1000&quality=85&fit=bounds&s=95116aeeb4c32cdef0f794d0fddca0a1 1000w, https://i.guim.co.uk/img/media/3e1d87f40e2ba9dc7607584222b82463c66dab26/0_0_2999_3543/master/2999.jpg?width=1500&quality=85&fit=bounds&s=2bb1e5fa8401f287b74b010d87752e70 1500w, https://i.guim.co.uk/img/media/3e1d87f40e2ba9dc7607584222b82463c66dab26/0_0_2999_3543/master/2999.jpg?width=2000&quality=85&fit=bounds&s=8e3dc20909198c6c7d3386531ef4ab32 2000w';

const galleryImage: Image = {
	kind: ElementKind.Image,
	src: 'https://i.guim.co.uk/img/media/3e1d87f40e2ba9dc7607584222b82463c66dab26/0_0_2999_3543/master/2999.jpg?width=500&quality=85&fit=bounds&s=94dc44b35cec62a756b7987b9d4ddd0c',
	srcset: srcset,
	dpr2Srcset: srcset,
	alt: some('image'),
	width: 550,
	height: 550,
	role: 1,
	caption: some(captionDoc()),
	credit: none,
	nativeCaption: some('Native caption'),
	imageSubtype: Optional.some(ImageSubtype.Jpeg),
};

export default galleryImage;
