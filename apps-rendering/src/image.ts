// ----- Imports ----- //

import type { Image as CardImage } from '@guardian/apps-rendering-api-models/image';
import type { Asset } from '@guardian/content-api-models/v1/asset';
import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ArticleElementRole } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '../vendor/@guardian/types/index';
import {
	andThen,
	fromNullable,
	map,
	none,
	some,
} from '../vendor/@guardian/types/index';
import type { Image as ImageData } from 'image/image';
import { ImageSubtype } from 'image/image';
import { Dpr, src, srcsets } from 'image/srcsets';
import { pipe } from 'lib';
import { Optional } from 'optional';
import type { Context } from 'parserContext';
import type { ReactNode } from 'react';

// ----- Types ----- //

interface Image extends ImageData {
	caption: Option<DocumentFragment>;
	credit: Option<string>;
	nativeCaption: Option<string>;
}

interface BodyImageProps {
	image: Image;
	children?: ReactNode;
	format: ArticleFormat;
}

// ----- Functions ----- //

const parseCredit = (
	displayCredit: boolean | undefined,
	credit: string | undefined,
): Option<string> =>
	pipe(
		displayCredit,
		fromNullable,
		andThen((display) => (display ? fromNullable(credit) : none)),
	);

const parseRole = (role: string | undefined): ArticleElementRole => {
	switch (role) {
		case 'thumbnail':
			return ArticleElementRole.Thumbnail;
		case 'halfWidth':
			return ArticleElementRole.HalfWidth;
		default:
			return ArticleElementRole.Standard;
	}
};

const parseImageSubtype = (asset: Asset): Optional<ImageSubtype> => {
	switch (asset.mimeType) {
		case 'image/jpeg':
			return Optional.some(ImageSubtype.Jpeg);
		case 'image/png':
			return Optional.some(ImageSubtype.Png);
		case 'image/svg+xml':
			return Optional.some(ImageSubtype.Svg);
		default:
			return Optional.none();
	}
};

const sortAscendingWidth = (a: Asset, b: Asset): number =>
	a.typeData?.width && b.typeData?.width
		? a.typeData.width - b.typeData.width
		: -1;

const getHighestResAsset = (assets: Asset[]): Optional<Asset> =>
	Optional.fromNullable(assets.slice().sort(sortAscendingWidth).pop());

const getBestAsset = (assets: Asset[]): Optional<Asset> => {
	const masterAsset = Optional.fromNullable(
		assets.find((asset) => asset.typeData?.isMaster),
	);
	if (masterAsset.isSome()) {
		return masterAsset;
	}

	return getHighestResAsset(assets);
};

const parseImage =
	({ docParser, salt }: Context) =>
	(element: BlockElement): Optional<Image> => {
		const data = element.imageTypeData;

		return getBestAsset(element.assets).flatMap((asset) => {
			if (
				asset.file === undefined ||
				asset.file === '' ||
				asset.typeData?.width === undefined ||
				asset.typeData.height === undefined
			) {
				return Optional.none();
			}

			return Optional.some({
				src: src(
					salt,
					asset.typeData.secureFile ?? asset.file,
					500,
					Dpr.One,
				),
				...srcsets(asset.typeData.secureFile ?? asset.file, salt),
				alt: fromNullable(data?.alt),
				width: asset.typeData.width,
				height: asset.typeData.height,
				caption: pipe(data?.caption, fromNullable, map(docParser)),
				credit: parseCredit(data?.displayCredit, data?.credit),
				nativeCaption: fromNullable(data?.caption),
				role: parseRole(data?.role),
				imageSubtype: parseImageSubtype(asset),
			});
		});
	};

const parseCardImage = (
	image: CardImage | undefined,
	salt: string,
): Option<Image> => {
	if (image === undefined) {
		return none;
	}

	return some({
		src: src(salt, image.url, 500, Dpr.One),
		...srcsets(image.url, salt),
		alt: fromNullable(image.altText),
		width: image.width,
		height: image.height,
		caption: none,
		credit: none,
		nativeCaption: none,
		role: ArticleElementRole.Standard,
		imageSubtype: Optional.none(),
	});
};

// ----- Exports ----- //

export { Image, parseImage, parseCardImage, BodyImageProps };
