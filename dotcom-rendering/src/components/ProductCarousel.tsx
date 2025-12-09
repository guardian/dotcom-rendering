import type { FEElement } from '../types/content';

interface ProductCarouselProps {
	matchedProducts?: FEElement[];
}

const ProductCarousel = ({ matchedProducts }: ProductCarouselProps) => (
	<aside>
		<ul>
			{matchedProducts?.map((product) => (
				<li
					key={
						(product as FEElement & { elementId: string }).elementId
					}
				>
					<a href={(product as FEElement & { url: string }).url}>
						{(product as FEElement & { label: string }).label}
					</a>
				</li>
			))}
		</ul>
	</aside>
);

export { ProductCarousel };
