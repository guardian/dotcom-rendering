// ----- Imports ----- //

import type { Image as CardImage } from '@guardian/apps-rendering-api-models/image';
import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ArticleElementRole } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { Option, OptionKind } from '@guardian/types';
import { andThen, fromNullable, map, none, some } from '@guardian/types';
import type { Image as ImageData } from 'image/image';
import { Dpr, src, srcsets } from 'image/srcsets';
import { pipe } from 'lib';
import type { Context } from 'parserContext';
import type { ReactNode } from 'react';
import { Asset } from '@guardian/content-api-models/v1/asset';

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

const sortAscendingWidth = (a: Asset, b: Asset) =>
	a.typeData?.width && b.typeData?.width
		? a.typeData.width - b.typeData.width
		: 0;

const getHighestResAsset = (assets: Asset[]): Option<Asset> => {
	const asset = assets
		.filter((asset) => asset.typeData?.width && asset.typeData?.height)
		.sort(sortAscendingWidth)
		.pop();
	return fromNullable(asset);
};

const parseImage =
	({ docParser, salt }: Context) =>
	(element: BlockElement): Option<Image> => {
		const maybeMasterAsset = fromNullable(
			element.assets.find((asset) => asset.typeData?.isMaster),
		);

		const maybeHighestResAsset = getHighestResAsset(element.assets);

		const maybeBestAsset =
			maybeMasterAsset.kind === OptionKind.Some
				? maybeMasterAsset
				: maybeHighestResAsset;

		const data = element.imageTypeData;

		return pipe(
			maybeBestAsset,
			andThen((asset) => {
				if (
					asset.file === undefined ||
					asset.file === '' ||
					asset.typeData?.width === undefined ||
					asset.typeData.height === undefined
				) {
					return none;
				}

				return some({
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
				});
			}),
		);
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
	});
};

// ----- Exports ----- //

export { Image, parseImage, parseCardImage, BodyImageProps };
