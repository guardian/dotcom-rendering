import { isUndefined } from '@guardian/libs';
import { stripHTML } from '../model/sanitise';
import type { FEElement } from '../types/content';
import { ProductCarousel } from './Carousel.importable';
import type { Product } from './ProductCard';

function isFullProduct(product: Partial<Product>): product is Product {
	return (
		!isUndefined(product) &&
		!isUndefined(product.title) &&
		!isUndefined(product.image) &&
		!isUndefined(product.link) &&
		!isUndefined(product.price)
	);
}

const getRandomStars = () => {
	const stars = ['★★★☆☆', '★★★★☆', '★★★★★'];
	return stars[Math.floor(Math.random() * stars.length)];
};

const getProductsFromArticle = (elements: FEElement[]): Product[] => {
	const products: Partial<Product>[] = [];
	let productNumber = 0;
	for (const element of elements) {
		const currentProduct = products[productNumber];
		if (
			element._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
		) {
			productNumber++;

			products[productNumber] = {
				title: stripHTML(element.html),
				stars: getRandomStars(),
			};
		}
		if (
			element._type ===
				'model.dotcomrendering.pageElements.ImageBlockElement' &&
			!isUndefined(currentProduct) &&
			isUndefined(currentProduct.image)
		) {
			currentProduct.image =
				element.media.allImages[element.media.allImages.length - 2]
					?.url ?? '';
		}
		if (
			element._type ===
			'model.dotcomrendering.pageElements.TextBlockElement'
		) {
			const priceMatch = element.html.match(/£\d+/);
			const linkMatch = element.html.match(/href="([^"]+)"/);
			if (
				priceMatch &&
				!isUndefined(currentProduct) &&
				isUndefined(currentProduct.price)
			) {
				currentProduct.price = priceMatch[0];
			}
			if (
				linkMatch &&
				!isUndefined(currentProduct) &&
				isUndefined(currentProduct.link)
			) {
				currentProduct.link = linkMatch[1]?.replace(/&amp;/g, '&');
			}
		}
	}
	return products.filter((product) => {
		return isFullProduct(product);
	});
};

export const FilterCarouselComponent = ({
	elements,
}: {
	elements: FEElement[] | undefined;
}) => {
	if (isUndefined(elements)) {
		return null;
	}
	const products = getProductsFromArticle(elements);
	return <ProductCarousel products={products} />;
};
